// Cart Service - Cart operations

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// Get user's cart
export const getCart = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.CART_GET);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (productId, quantity = 1, size = null) => {
  try {
    const response = await api.post(API_ENDPOINTS.CART_ADD_ITEM, {
      productId,
      quantity,
      size
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(
      API_ENDPOINTS.CART_UPDATE_ITEM.replace(':itemId', itemId),
      { quantity }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(
      API_ENDPOINTS.CART_REMOVE_ITEM.replace(':itemId', itemId)
    );
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const response = await api.delete(API_ENDPOINTS.CART_GET);
    return response.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
