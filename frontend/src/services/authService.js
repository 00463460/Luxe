// Authentication service

import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

// User signup
export const signup = async (userData) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH_SIGNUP, {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName
    });

    // Store token
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

// User login
export const login = async (email, password) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH_LOGIN, {
      email,
      password
    });

    // Store token
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH_REFRESH);

    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Get current user
export const getCurrentUser = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    // Decode JWT to get user info (simple implementation)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

// Check if user is admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === 'admin';
};
