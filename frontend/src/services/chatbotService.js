// Chatbot Service - API calls and KB parsing

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Knowledge base data (will be loaded from backend in production)
const knowledgeBase = {
  perfumes: [],
  clothing: [],
  general: []
};

// Parse knowledge base files
export const loadKnowledgeBase = async () => {
  try {
    // Load perfume KB
    const perfumeRes = await fetch('/knowledge-base/perfume-kb.txt');
    const perfumeText = await perfumeRes.text();
    knowledgeBase.perfumes = parseKBText(perfumeText);

    // Load clothing KB
    const clothingRes = await fetch('/knowledge-base/clothing-kb.txt');
    const clothingText = await clothingRes.text();
    knowledgeBase.clothing = parseKBText(clothingText);

    // Load general FAQ
    const generalRes = await fetch('/knowledge-base/general-faq.txt');
    const generalText = await generalRes.text();
    knowledgeBase.general = parseKBText(generalText);

    console.log('✅ Knowledge base loaded');
  } catch (error) {
    console.error('Error loading knowledge base:', error);
  }
};

// Parse KB text format (Q: ... A: ...)
const parseKBText = (text) => {
  const entries = [];
  const lines = text.split('\n');
  let currentQ = '';
  let currentA = '';
  let isAnswer = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('Q:')) {
      if (currentQ && currentA) {
        entries.push({
          question: currentQ.replace('Q:', '').trim(),
          answer: currentA.replace('A:', '').trim()
        });
      }
      currentQ = line;
      currentA = '';
      isAnswer = false;
    } else if (line.startsWith('A:')) {
      currentA = line;
      isAnswer = true;
    } else if (isAnswer && line) {
      currentA += ' ' + line;
    } else if (!isAnswer && line) {
      currentQ += ' ' + line;
    }
  }

  // Add last entry
  if (currentQ && currentA) {
    entries.push({
      question: currentQ.replace('Q:', '').trim(),
      answer: currentA.replace('A:', '').trim()
    });
  }

  return entries;
};

// Calculate similarity between user question and KB questions
const calculateSimilarity = (userQuery, kbQuestion) => {
  const userWords = userQuery.toLowerCase().split(/\s+/);
  const kbWords = kbQuestion.toLowerCase().split(/\s+/);

  let matches = 0;
  for (const word of userWords) {
    if (word.length > 3 && kbWords.some(w => w.includes(word) || word.includes(w))) {
      matches++;
    }
  }

  return matches / Math.max(userWords.length, kbWords.length);
};

// Find best matching answer from KB
const findBestMatch = (query) => {
  let bestMatch = null;
  let highestScore = 0;

  // Search across all KB categories
  const allEntries = [
    ...knowledgeBase.perfumes,
    ...knowledgeBase.clothing,
    ...knowledgeBase.general
  ];

  for (const entry of allEntries) {
    const score = calculateSimilarity(query, entry.question);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  return { answer: bestMatch?.answer || null, confidence: highestScore };
};

// Ask chatbot a question
export const askQuestion = async (question) => {
  try {
    // Try backend first (if available)
    try {
      const response = await api.post(API_ENDPOINTS.CHATBOT_ASK, {
        question
      });
      return response.data;
    } catch (error) {
      // Fallback to local KB if backend unavailable
      console.log('Backend unavailable, using local KB');
      const { answer, confidence } = findBestMatch(question);

      if (answer && confidence > 0.2) {
        return {
          success: true,
          question,
          answer,
          confidence,
          source: 'local-kb'
        };
      } else {
        return {
          success: true,
          question,
          answer: `I'm not sure about that. Here are some things I can help with:\n\n📦 Product Questions: Ask about perfumes or clothing\n💳 Shipping & Orders: Questions about delivery and returns\n💬 General: Any other questions about our brand`,
          confidence: 0,
          source: 'default'
        };
      }
    }
  } catch (error) {
    console.error('Error asking chatbot:', error);
    throw error;
  }
};

// Get suggested questions
export const getSuggestedQuestions = () => {
  const suggested = [
    'What are your best summer perfumes?',
    'Do you have cotton clothing?',
    'How long does shipping take?',
    'What is your return policy?'
  ];
  return suggested;
};

export default {
  loadKnowledgeBase,
  askQuestion,
  getSuggestedQuestions
};
