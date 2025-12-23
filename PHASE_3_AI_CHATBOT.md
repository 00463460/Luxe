// AI CHATBOT - PHASE 3 IMPLEMENTATION

/*
================================================================================
AI CHATBOT WITH KNOWLEDGE BASE - PHASE 3 COMPLETE
================================================================================

The AI Chatbot is a floating widget that uses your knowledge base files to answer
customer questions about products, shipping, and general FAQs.

================================================================================
FEATURES
================================================================================

✨ INTELLIGENT RESPONSES
- Reads from perfume-kb.txt, clothing-kb.txt, general-faq.txt
- Semantic similarity matching to find best answers
- Confidence scoring (0-1 scale)
- Fallback responses for unknown questions

✨ USER INTERFACE
- Floating chat button (bottom-right corner)
- Minimizable/closable chat window
- Clean conversation history
- Typing indicators while processing
- Timestamp for each message
- "Clear chat" button

✨ SMART FEATURES
- Real-time message processing
- Auto-scroll to latest message
- Disabled input during loading
- Mobile responsive design
- Fallback to local KB if backend unavailable
- Error handling with support contact info

================================================================================
HOW IT WORKS
================================================================================

1. KNOWLEDGE BASE LOADING
   - On app startup, KB files are loaded from /knowledge-base/
   - Files parsed into Q&A pairs
   - Data cached in frontend (or stored in DB on backend)

2. USER ASKS QUESTION
   - User types message in chat widget
   - Message sent to /api/chatbot/ask endpoint
   - If backend unavailable, uses local KB

3. SIMILARITY MATCHING
   - Backend calculates similarity between user query and KB questions
   - Uses keyword matching algorithm:
     * Split both question and KB entry into words
     * Check if words appear in both (length > 3 chars)
     * Calculate match score as ratio of matching words
   - Returns highest-scoring answer

4. RESPONSE QUALITY
   - Confidence > 0.5: Highly relevant answer
   - Confidence 0.2-0.5: Possibly relevant
   - Confidence < 0.2: Generic response

5. RESPONSE RETURNED
   - Contains: answer text, confidence score, category
   - Displayed with timestamp
   - Shows confidence % to user

================================================================================
FRONTEND IMPLEMENTATION
================================================================================

1. ChatBot.jsx (/src/components/ChatBot.jsx)
   
   COMPONENT STATE:
   - isOpen: Boolean - whether chat widget is visible
   - messages: Array - conversation history
   - inputValue: String - current message input
   - isLoading: Boolean - waiting for response

   FEATURES:
   - Floating button when closed (MessageCircle icon)
   - Expandable chat window when opened
   - Header with title and close button
   - Message display area with auto-scroll
   - Input form with send button
   - Loading animation (bouncing dots)
   - Clear chat button

   STYLING:
   - Uses luxury color palette (luxury-600 primary)
   - Responsive: full width on mobile, fixed width on desktop
   - Fixed position (bottom-right)
   - Z-index 40 (button) and 50 (window)
   - Smooth animations and transitions

2. chatbotService.js (/src/services/chatbotService.js)

   EXPORTED FUNCTIONS:
   
   loadKnowledgeBase()
   - Fetches KB text files from public folder
   - Parses into Q&A pairs
   - Caches in memory

   askQuestion(question)
   - Sends question to backend or uses local KB
   - Returns: { answer, confidence, source, category }
   - Fallback to local KB if backend unavailable

   getSuggestedQuestions()
   - Returns array of example questions for users

   PARSING:
   - Format: "Q: question text\nA: answer text"
   - Handles multi-line questions and answers
   - Strips "Q:" and "A:" prefixes

   SIMILARITY ALGORITHM:
   - Tokenizes user query and KB questions
   - Counts matching words (length > 3)
   - Score = matches / max_word_count
   - Only returns if score > 0.2

================================================================================
BACKEND IMPLEMENTATION
================================================================================

1. Chatbot Routes (/api/chatbot)
   
   POST /ask
   - Body: { question: string }
   - Returns: { answer, confidence, category }
   - Public route (no auth required)

   GET /kb
   - Optional query: ?category=perfume|clothing|general
   - Returns all KB entries
   - Admin can view entire knowledge base

   POST /kb/add (Admin only)
   - Add new KB entry
   - Requires: category, question, answer
   - Optional: keywords array

   PUT /kb/:id (Admin only)
   - Update KB entry

   DELETE /kb/:id (Admin only)
   - Delete KB entry

2. Chatbot Controller (/src/controllers/chatbotController.js)

   askQuestion(question)
   - Validates question (min 2 chars)
   - Queries all KB entries from database
   - Calculates similarity for each entry
   - Returns best match or generic response
   - Confidence threshold: 0.2

   getKnowledgeBase(category)
   - Returns all KB entries, optionally filtered by category

   addKBEntry(category, question, answer, keywords)
   - Creates new KB entry with UUID
   - Admin only

   updateKBEntry(id, question, answer, keywords)
   - Updates existing KB entry
   - Admin only

   deleteKBEntry(id)
   - Deletes KB entry
   - Admin only

3. Database Schema (chatbot_kb table)
   - id: UUID (primary key)
   - category: 'perfume' | 'clothing' | 'general'
   - question: TEXT
   - answer: TEXT
   - keywords: TEXT ARRAY (optional, for better matching)
   - created_at: TIMESTAMP
   - updated_at: TIMESTAMP

================================================================================
KNOWLEDGE BASE FORMAT
================================================================================

Each KB file uses this format:

Q: What are the best summer perfumes?
A: Our summer collection includes Fresh Citrus Bliss (citrus and lemon notes), 
   Ocean Breeze Essence (aquatic with coconut), and Tropical Paradise (floral and fruity). 
   These are light, fresh fragrances perfect for warm weather.

Q: How long does shipping take?
A: Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available 
   for an additional fee. Orders ship from our warehouse in California.

RULES:
- Each Q&A pair on separate lines
- Questions start with "Q:"
- Answers start with "A:"
- Multi-line answers are joined with spaces
- Empty lines separate entries (optional)

FILES:
- perfume-kb.txt: Perfume-specific questions
- clothing-kb.txt: Clothing-specific questions  
- general-faq.txt: General FAQs (shipping, returns, payments)

================================================================================
EXAMPLE INTERACTIONS
================================================================================

USER: "Which perfume is best for summer?"
BOT: Searches KB → Finds similar question about summer perfumes
    Returns: "Our summer collection includes Fresh Citrus Bliss..."
    Confidence: 0.85

USER: "Do you have cotton shirts?"
BOT: Searches KB → Finds relevant clothing material question
    Returns: "Our men's collection includes Premium Cotton T-Shirt..."
    Confidence: 0.78

USER: "What's your return policy?"
BOT: Searches KB → Finds exact match in general FAQ
    Returns: "We offer 30-day returns for unworn items..."
    Confidence: 0.92

USER: "Random question about xyz"
BOT: Searches KB → No good match (confidence < 0.2)
    Returns: Generic help message with suggestions
    Confidence: 0

================================================================================
EXTENDING THE CHATBOT
================================================================================

ADD TO ADMIN DASHBOARD:
1. Create KB Management page (/admin/chatbot)
2. Show all KB entries in table
3. Add form to create new entries
4. Edit/delete buttons for each entry
5. Search KB by question

IMPROVE MATCHING:
1. Use TF-IDF scoring instead of simple keyword matching
2. Implement Levenshtein distance for typo tolerance
3. Use word embeddings (OpenAI API)
4. Add stemming/lemmatization

ADD AI FEATURES:
1. Integrate OpenAI GPT API for more intelligent responses
2. Keep local KB as fallback
3. Cache responses for faster lookup
4. Train custom model on KB data

ANALYTICS:
1. Track frequently asked questions
2. Monitor unanswered questions
3. Collect user feedback on answers
4. Identify gaps in knowledge base

================================================================================
ERROR HANDLING
================================================================================

FRONTEND ERRORS:
- Network error: "Sorry, I encountered an error..."
- KB loading failure: Falls back to asking backend anyway
- Invalid input: Prevents empty message sending

BACKEND ERRORS:
- Invalid question: Returns validation error
- KB not found: Returns generic response
- Database error: Returns 500 with error message

GRACEFUL DEGRADATION:
- Backend unavailable → Uses local KB
- Invalid similarity scores → Returns default response
- Missing KB file → Still functional with generic responses

================================================================================
TESTING THE CHATBOT
================================================================================

1. START BOTH SERVERS
   Backend: npm run dev (port 5000)
   Frontend: npm run dev (port 5173)

2. VIEW CHATBOT
   - Click floating button (bottom-right)
   - Chat window opens

3. TEST QUESTIONS
   Ask about:
   - "What perfumes for summer?"
   - "Do you have cotton clothing?"
   - "What's your shipping policy?"
   - "How do I return items?"

4. CHECK RESPONSES
   - Answers should match KB entries
   - Confidence scores should display
   - Fallback response for unknown queries

5. TEST EDGE CASES
   - Empty message (shouldn't send)
   - Very short message (< 2 chars)
   - Special characters
   - Multiple questions at once

================================================================================
NEXT PHASE: AUTH & CART
================================================================================

Phase 4 will add:
- Signup/Login pages with form validation
- Add to Cart functionality with Redux
- Cart Modal showing items
- Checkout process
- Payment integration (Stripe)

When ready, request Phase 4 implementation!

================================================================================
*/
