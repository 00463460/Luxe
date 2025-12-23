// Protected route for admin pages

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../services/authService';

export default function AdminRoute({ children }) {
  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
