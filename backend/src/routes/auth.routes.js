// Auth Routes - Express.js

import express from 'express';
import {
  signup,
  login,
  refreshToken,
  getCurrentUser
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', protect, refreshToken);
router.get('/me', protect, getCurrentUser);

export default router;
