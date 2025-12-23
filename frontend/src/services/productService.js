// API service for product operations

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Get all products
export const getProducts = async (filters = {}) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS_LIST, { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product
export const getProductById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCT_DETAIL.replace(':id', id));
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS_BY_CATEGORY.replace(':category', category));
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

// Create product (Admin)
export const createProduct = async (productData) => {
  try {
    const response = await api.post(API_ENDPOINTS.ADMIN_CREATE_PRODUCT, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product (Admin)
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.ADMIN_UPDATE_PRODUCT.replace(':id', id),
      productData
    );
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product (Admin)
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(
      API_ENDPOINTS.ADMIN_DELETE_PRODUCT.replace(':id', id)
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Batch operations
export const bulkDeleteProducts = async (ids) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.ADMIN_CREATE_PRODUCT}/bulk-delete`, { ids });
    return response.data;
  } catch (error) {
    console.error('Error bulk deleting products:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query) => {
  try {
    const response = await api.get(API_ENDPOINTS.PRODUCTS_LIST, {
      params: { search: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};
