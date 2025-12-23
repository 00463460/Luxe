// Chatbot Routes - Express.js

import express from 'express';
import {
  askQuestion,
  getKnowledgeBase,
  addKBEntry,
  updateKBEntry,
  deleteKBEntry
} from '../controllers/chatbotController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/ask', askQuestion);
router.get('/kb', getKnowledgeBase);

// Admin routes
router.post('/kb/add', protect, adminOnly, addKBEntry);
router.put('/kb/:id', protect, adminOnly, updateKBEntry);
router.delete('/kb/:id', protect, adminOnly, deleteKBEntry);

export default router;
