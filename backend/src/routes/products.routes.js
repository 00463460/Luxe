// Backend Product Routes - Express.js

import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Protected admin routes
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;
