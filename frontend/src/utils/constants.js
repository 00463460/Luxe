// Frontend API service configuration
// This will be populated in Phase 1

export const API_ENDPOINTS = {
  // Auth
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGIN: '/auth/login',
  AUTH_REFRESH: '/auth/refresh',

  // Products
  PRODUCTS_LIST: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCTS_BY_CATEGORY: '/products/category/:category',

  // Admin
  ADMIN_CREATE_PRODUCT: '/admin/products',
  ADMIN_UPDATE_PRODUCT: '/admin/products/:id',
  ADMIN_DELETE_PRODUCT: '/admin/products/:id',

  // Cart
  CART_GET: '/cart',
  CART_ADD_ITEM: '/cart/add',
  CART_UPDATE_ITEM: '/cart/items/:itemId',
  CART_REMOVE_ITEM: '/cart/items/:itemId',

  // Orders
  ORDERS_CREATE: '/orders',
  ORDERS_LIST: '/orders',

  // Chatbot
  CHATBOT_ASK: '/chatbot/ask'
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
