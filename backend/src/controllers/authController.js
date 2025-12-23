// Auth Controller - Business Logic

import pool from '../config/database.js';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../utils/jwt.js';
import { ValidationError, AuthenticationError, ConflictError } from '../utils/errors.js';

// User signup
export const signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name } = req.body;

    // Validation
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const userId = uuidv4();
    const result = await pool.query(
      `INSERT INTO users (id, email, password_hash, first_name, last_name, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, email, first_name, last_name, role`,
      [userId, email, hashedPassword, first_name || '', last_name || '', 'customer']
    );

    const user = result.rows[0];
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // Find user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      throw new AuthenticationError('Invalid email or password');
    }

    const user = result.rows[0];

    // Check password
    const isPasswordValid = await bcryptjs.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user.id, user.role);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Refresh token
export const refreshToken = async (req, res) => {
  try {
    const { userId, role } = req.user;

    const newToken = generateToken(userId, role);

    res.json({
      success: true,
      data: { token: newToken }
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ success: false, error: 'Failed to refresh token' });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, first_name, last_name, role FROM users WHERE id = $1',
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
