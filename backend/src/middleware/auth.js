// Authentication Middleware

import { verifyToken, decodeToken } from '../utils/jwt.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';

// Protect route - require authentication
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(error.status || 401).json({
      success: false,
      error: error.message || 'Authentication failed'
    });
  }
};

// Admin only - require admin role
export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin access required'
    });
  }
  next();
};

// Optional auth - attach user if token exists
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      req.user = verifyToken(token);
    }

    next();
  } catch (error) {
    // Continue without user if token is invalid
    next();
  }
};
