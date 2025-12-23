// Cart Controller - Business Logic

import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError, ValidationError } from '../utils/errors.js';

// Get user's cart with items
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get or create cart
    let cartResult = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    );

    let cart;
    if (cartResult.rows.length === 0) {
      // Create new cart
      const cartId = uuidv4();
      await pool.query(
        'INSERT INTO cart (id, user_id) VALUES ($1, $2)',
        [cartId, userId]
      );
      cart = { id: cartId, user_id: userId };
    } else {
      cart = cartResult.rows[0];
    }

    // Get cart items with product details
    const itemsResult = await pool.query(
      `SELECT ci.*, p.name, p.price, p.image_url, p.category
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart.id]
    );

    // Calculate total
    const total = itemsResult.rows.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    res.json({
      success: true,
      data: {
        cart: cart,
        items: itemsResult.rows,
        total: total.toFixed(2),
        itemCount: itemsResult.rows.reduce((sum, item) => sum + item.quantity, 0)
      }
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch cart' });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userId = req.user.userId;
    const { productId, quantity = 1, size = null } = req.body;

    if (!productId || quantity < 1) {
      throw new ValidationError('Invalid product ID or quantity');
    }

    // Verify product exists
    const productResult = await client.query(
      'SELECT * FROM products WHERE id = $1',
      [productId]
    );

    if (productResult.rows.length === 0) {
      throw new NotFoundError('Product');
    }

    const product = productResult.rows[0];

    if (product.stock_quantity < quantity) {
      throw new ValidationError('Insufficient stock');
    }

    // Get or create cart
    let cartResult = await client.query(
      'SELECT * FROM cart WHERE user_id = $1',
      [userId]
    );

    let cartId;
    if (cartResult.rows.length === 0) {
      cartId = uuidv4();
      await client.query(
        'INSERT INTO cart (id, user_id) VALUES ($1, $2)',
        [cartId, userId]
      );
    } else {
      cartId = cartResult.rows[0].id;
    }

    // Check if item already in cart
    const existingItem = await client.query(
      'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2 AND size_selected IS NOT DISTINCT FROM $3',
      [cartId, productId, size]
    );

    if (existingItem.rows.length > 0) {
      // Update quantity
      await client.query(
        'UPDATE cart_items SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [quantity, existingItem.rows[0].id]
      );
    } else {
      // Add new item
      const itemId = uuidv4();
      await client.query(
        'INSERT INTO cart_items (id, cart_id, product_id, quantity, size_selected) VALUES ($1, $2, $3, $4, $5)',
        [itemId, cartId, productId, quantity, size]
      );
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Item added to cart'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error adding to cart:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 0) {
      throw new ValidationError('Quantity must be positive');
    }

    const result = await pool.query(
      'SELECT * FROM cart_items WHERE id = $1',
      [itemId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Cart item');
    }

    if (quantity === 0) {
      // Remove item if quantity is 0
      await pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);
    } else {
      await pool.query(
        'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [quantity, itemId]
      );
    }

    res.json({
      success: true,
      message: 'Cart item updated'
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const result = await pool.query(
      'SELECT * FROM cart_items WHERE id = $1',
      [itemId]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Cart item');
    }

    await pool.query('DELETE FROM cart_items WHERE id = $1', [itemId]);

    res.json({
      success: true,
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    await pool.query(
      'DELETE FROM cart_items WHERE cart_id IN (SELECT id FROM cart WHERE user_id = $1)',
      [userId]
    );

    res.json({
      success: true,
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ success: false, error: 'Failed to clear cart' });
  }
};
