# ChatBot ChatGPT Integration Guide

## What's Been Done

### ✅ Backend Changes
- **Updated `chatbotController.js`**: Added ChatGPT integration using OpenAI API
- **Hybrid Approach**: The chatbot will try to use ChatGPT first, then fallback to local knowledge base if API unavailable
- **Knowledge Base Context**: Sends local KB entries to ChatGPT for context-aware responses

### ✅ Frontend Changes  
- **Fixed ChatBot Visibility**: 
  - Changed from glassmorphism to solid dark theme with white border
  - Improved header styling with white gradient background
  - Larger, more visible floating button (16x16 px, white background, bouncing animation)
  - Better z-index layering (z-50 for widget, z-50 for button)
  - Added `bottom-24` offset to prevent footer overlap
  
- **Enhanced UI**:
  - White header with black text for better contrast
  - Better message styling with whitespace preservation
  - Improved input field visibility with white submit button
  - Cleaner overall design matching black theme

### ✅ Configuration Files
- Created `.env` file in backend with all necessary configuration variables
- OPENAI_API_KEY placeholder ready for your API key

## How to Set Up ChatGPT

### Step 1: Get OpenAI API Key
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Add API Key to .env
Open `backend/.env` and replace:
```
OPENAI_API_KEY=sk-your-openai-api-key-here
```
with your actual key:
```
OPENAI_API_KEY=sk-xyz123abc...
```

### Step 3: Verify Backend Server is Running
```bash
cd backend
npm install  # if not already done
npm run dev
```

Server should run on `http://localhost:5000`

### Step 4: Test the Chatbot
1. Open the app in browser
2. Click the white chat bubble in bottom-right corner
3. Type a question like:
   - "What perfumes do you have?"
   - "Tell me about shipping"
   - "How long do fragrances last?"
4. Chatbot will respond using ChatGPT

## How It Works

### ChatGPT Integration Flow
```
User Message
    ↓
Backend Chatbot Controller
    ↓
OpenAI API (if key available)
    ↓
    ├─ Success → Return ChatGPT response
    └─ Fail → Fallback to KB matching
    ↓
Frontend displays response
```

### Features
- **AI-Powered Responses**: ChatGPT generates natural, contextual answers
- **Knowledge Base Integration**: Provides local product info for context
- **Fallback System**: Uses local KB if API unavailable or rate-limited
- **Confidence Scores**: Shows reliability of responses (95% for ChatGPT, lower for KB matches)
- **Professional Tone**: System prompt ensures responses match brand voice

## Frontend Chatbot Visibility

The chatbot is now much more visible with:
- **White floating button** in bottom-right corner with bounce animation
- **Proper z-index** (z-50) above footer
- **Solid dark container** with white border and header
- **Clear contrast** between user and bot messages
- **Responsive design** that works on mobile and desktop

## Testing

### Test Queries
Try these to verify ChatGPT integration:
- "What are your bestselling perfumes?"
- "Do you offer international shipping?"
- "How do I care for delicate clothing?"
- "Tell me about your return policy"
- "What's the difference between Eau de Parfum and Eau de Toilette?"

### Expected Behavior
1. Question appears in white bubble (right side)
2. Loading dots appear in bot message
3. ChatGPT generates response with context from KB
4. Response appears in dark bubble (left side)
5. Confidence level shows ~95%

## Troubleshooting

### Chatbot not visible?
- Check z-index in browser DevTools (should be z-50)
- Verify footer height doesn't cover button
- Clear browser cache and reload

### ChatGPT not responding?
- Verify API key is correct in `.env`
- Check backend server is running on port 5000
- Look for errors in browser console (F12 → Console tab)
- Verify API key has available credits (https://platform.openai.com/account/billing/overview)

### Getting KB responses instead of ChatGPT?
- API key might be invalid or expired
- Check backend logs for errors
- Verify network requests in DevTools (Network tab → chatbot/ask)
- Check OpenAI API status page

### Rate Limiting?
- OpenAI has rate limits based on your plan
- Wait a few seconds between messages
- Consider upgrading your OpenAI account plan

## Pricing

OpenAI API pricing (as of 2024):
- GPT-3.5-turbo: ~$0.0015 per 1K input tokens, $0.002 per 1K output tokens
- Very affordable for most use cases
- Set spending limits in OpenAI dashboard

## Files Modified

1. **`backend/src/controllers/chatbotController.js`**
   - Added ChatGPT API integration
   - Implemented hybrid KB + ChatGPT approach
   - Added environment variable import

2. **`frontend/src/components/ChatBot.jsx`**
   - Fixed visibility issues
   - Improved styling and contrast
   - Better layout spacing and z-index

3. **`backend/.env`** (NEW)
   - Configuration file with all environment variables
   - Ready for your API keys

## Next Steps

1. ✅ Add your OpenAI API key to `.env`
2. ✅ Restart backend server
3. ✅ Test chatbot responses
4. Optional: Add more knowledge base entries for better context
5. Optional: Customize system prompt for different brand voice
