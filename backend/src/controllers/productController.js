// Product Controller - Business Logic

import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError, ValidationError } from '../utils/errors.js';

// Get all products with pagination and filters
export const getAllProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 12, sort = 'created_at' } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    let paramIndex = 1;

    // Filter by category
    if (category) {
      query += ` AND category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    // Sorting
    const validSortFields = ['created_at', 'price', 'rating', 'name'];
    const sortField = validSortFields.includes(sort) ? sort : 'created_at';
    query += ` ORDER BY ${sortField} DESC`;

    // Pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1';
    const countParams = [];
    if (category) {
      countQuery += ` AND category = $1`;
      countParams.push(category);
    }
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT p.*, pd.* FROM products p
       LEFT JOIN product_details pd ON p.id = pd.product_id
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Product');
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching product:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 ORDER BY created_at DESC',
      [category]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
};

// Search products
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      throw new ValidationError('Search query must be at least 2 characters');
    }

    const result = await pool.query(
      `SELECT * FROM products
       WHERE name ILIKE $1 OR description ILIKE $1
       ORDER BY created_at DESC
       LIMIT 20`,
      [`%${q}%`]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error searching products:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};

// Create product (Admin only)
export const createProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const {
      name,
      category,
      sub_category,
      price,
      description,
      image_url,
      stock_quantity,
      tags,
      // Perfume fields
      scent_family,
      notes,
      concentration,
      volume_ml,
      // Clothing fields
      size_chart,
      material,
      available_sizes
    } = req.body;

    // Validation
    if (!name || !category || !price || !image_url) {
      throw new ValidationError('Missing required fields: name, category, price, image_url');
    }

    const productId = uuidv4();

    // Insert product
    await client.query(
      `INSERT INTO products 
       (id, name, category, sub_category, price, description, image_url, stock_quantity, tags, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        productId,
        name,
        category,
        sub_category,
        price,
        description,
        image_url,
        stock_quantity || 0,
        JSON.stringify(tags) || null,
        req.user.userId
      ]
    );

    // Insert product details
    if (category === 'perfume') {
      await client.query(
        `INSERT INTO product_details 
         (product_id, category_type, scent_family, notes, concentration, volume_ml)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [productId, 'perfume', scent_family, notes, concentration, volume_ml]
      );
    } else if (category === 'clothing') {
      await client.query(
        `INSERT INTO product_details 
         (product_id, category_type, material, size_chart, available_sizes)
         VALUES ($1, $2, $3, $4, $5)`,
        [productId, 'clothing', material, JSON.stringify(size_chart), available_sizes]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { id: productId }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating product:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Update product (Admin only)
export const updateProduct = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { id } = req.params;
    const {
      name,
      category,
      sub_category,
      price,
      description,
      image_url,
      stock_quantity,
      tags,
      scent_family,
      notes,
      concentration,
      volume_ml,
      material,
      available_sizes
    } = req.body;

    // Check if product exists
    const productResult = await client.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (productResult.rows.length === 0) {
      throw new NotFoundError('Product');
    }

    // Update product
    await client.query(
      `UPDATE products 
       SET name = COALESCE($1, name),
           category = COALESCE($2, category),
           sub_category = COALESCE($3, sub_category),
           price = COALESCE($4, price),
           description = COALESCE($5, description),
           image_url = COALESCE($6, image_url),
           stock_quantity = COALESCE($7, stock_quantity),
           tags = COALESCE($8, tags),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9`,
      [name, category, sub_category, price, description, image_url, stock_quantity, tags && JSON.stringify(tags), id]
    );

    // Update product details if needed
    const detailsResult = await client.query(
      'SELECT * FROM product_details WHERE product_id = $1',
      [id]
    );

    if (detailsResult.rows.length > 0) {
      if (category === 'perfume' && (scent_family || notes || concentration || volume_ml)) {
        await client.query(
          `UPDATE product_details 
           SET scent_family = COALESCE($1, scent_family),
               notes = COALESCE($2, notes),
               concentration = COALESCE($3, concentration),
               volume_ml = COALESCE($4, volume_ml),
               updated_at = CURRENT_TIMESTAMP
           WHERE product_id = $5`,
          [scent_family, notes, concentration, volume_ml, id]
        );
      } else if (category === 'clothing' && (material || available_sizes)) {
        await client.query(
          `UPDATE product_details 
           SET material = COALESCE($1, material),
               available_sizes = COALESCE($2, available_sizes),
               updated_at = CURRENT_TIMESTAMP
           WHERE product_id = $3`,
          [material, available_sizes, id]
        );
      }
    }

    await client.query('COMMIT');

    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating product:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      throw new NotFoundError('Product');
    }

    // Delete product (cascades to product_details)
    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    const statusCode = error.status || 500;
    res.status(statusCode).json({ success: false, error: error.message });
  }
};
