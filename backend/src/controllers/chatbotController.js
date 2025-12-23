// Chatbot Controller - Business Logic

import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import env from '../config/env.js';

// Calculate text similarity using keyword matching
const calculateSimilarity = (userQuery, kbQuestion) => {
  const userWords = userQuery.toLowerCase().split(/\s+/);
  const kbWords = kbQuestion.toLowerCase().split(/\s+/);

  let matches = 0;
  for (const word of userWords) {
    if (word.length > 3) {
      if (kbWords.some(w => w.includes(word) || word.includes(w))) {
        matches++;
      }
    }
  }

  return matches / Math.max(userWords.length, kbWords.length);
};

// Ask chatbot a question (uses ChatGPT with knowledge base context)
export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length < 2) {
      throw new ValidationError('Question must be at least 2 characters');
    }

    // Get relevant KB entries for context
    const result = await pool.query('SELECT * FROM chatbot_kb LIMIT 20');
    const kbEntries = result.rows;

    // Build context from KB
    let kbContext = '';
    if (kbEntries.length > 0) {
      kbContext = 'Knowledge Base:\n';
      kbEntries.forEach((entry, idx) => {
        kbContext += `${idx + 1}. Q: ${entry.question}\nA: ${entry.answer}\n\n`;
      });
    }

    // Try to use ChatGPT if API key is available
    if (env.OPENAI_API_KEY) {
      try {
        const chatGPTResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are LUXE Assistant, a helpful customer service chatbot for a luxury e-commerce store selling premium perfumes and clothing. You are friendly, professional, and concise. Always provide helpful information about products, shipping, returns, and general inquiries.

${kbContext}

Guidelines:
- Be helpful and friendly
- Keep responses concise (2-3 sentences)
- For product recommendations, reference items from the knowledge base if relevant
- If you don't know something specific, offer to connect customer with support
- Always maintain a luxury, professional tone`
              },
              {
                role: 'user',
                content: question
              }
            ],
            temperature: 0.7,
            max_tokens: 200
          })
        });

        if (!chatGPTResponse.ok) {
          throw new Error('ChatGPT API error');
        }

        const chatGPTData = await chatGPTResponse.json();
        const answer = chatGPTData.choices[0].message.content.trim();

        return res.json({
          success: true,
          question,
          answer,
          confidence: 0.95,
          source: 'chatgpt',
          category: 'ai-powered'
        });
      } catch (chatGPTError) {
        console.warn('ChatGPT error, falling back to KB:', chatGPTError);
        // Fall through to KB matching
      }
    }

    // Fallback to knowledge base matching
    let bestMatch = null;
    let highestScore = 0;

    for (const entry of kbEntries) {
      const score = calculateSimilarity(question, entry.question);

      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    // If good match found, return it
    if (bestMatch && highestScore > 0.2) {
      return res.json({
        success: true,
        question,
        answer: bestMatch.answer,
        confidence: highestScore,
        category: bestMatch.category,
        source: 'knowledge-base'
      });
    }

    // Default response
    res.json({
      success: true,
      question,
      answer: `I couldn't find a specific answer about that. However, I can help with:\n\n🌸 Perfume Questions: scents, sizes, recommendations\n👕 Clothing Questions: materials, sizes, care\n📦 Shipping & Returns: delivery info, policies\n💳 Orders & Payments: general questions\n\nFeel free to ask or contact our support team at support@luxebrand.com`,
      confidence: 0,
      category: 'default',
      source: 'default'
    });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Get all knowledge base entries
export const getKnowledgeBase = async (req, res) => {
  try {
    const { category } = req.query;

    let query = 'SELECT * FROM chatbot_kb';
    const params = [];

    if (category) {
      query += ' WHERE category = $1';
      params.push(category);
    }

    const result = await pool.query(query, params);

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching KB:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch knowledge base' });
  }
};

// Add KB entry (Admin)
export const addKBEntry = async (req, res) => {
  try {
    const { category, question, answer, keywords } = req.body;

    if (!category || !question || !answer) {
      throw new ValidationError('Category, question, and answer are required');
    }

    const id = uuidv4();

    await pool.query(
      `INSERT INTO chatbot_kb (id, category, question, answer, keywords)
       VALUES ($1, $2, $3, $4, $5)`,
      [id, category, question, answer, keywords || null]
    );

    res.status(201).json({
      success: true,
      message: 'KB entry added successfully',
      data: { id }
    });
  } catch (error) {
    console.error('Error adding KB entry:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Update KB entry (Admin)
export const updateKBEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, keywords } = req.body;

    const result = await pool.query(
      'SELECT * FROM chatbot_kb WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('KB Entry');
    }

    await pool.query(
      `UPDATE chatbot_kb 
       SET question = COALESCE($1, question),
           answer = COALESCE($2, answer),
           keywords = COALESCE($3, keywords),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4`,
      [question, answer, keywords, id]
    );

    res.json({
      success: true,
      message: 'KB entry updated successfully'
    });
  } catch (error) {
    console.error('Error updating KB entry:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Delete KB entry (Admin)
export const deleteKBEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM chatbot_kb WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('KB Entry');
    }

    await pool.query('DELETE FROM chatbot_kb WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'KB entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting KB entry:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};
