import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../services/authService.js';

// Async thunks
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Signup failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
  return null;
});

const initialState = {
  user: authService.getCurrentUser(),
  token: localStorage.getItem('authToken') || null,
  loading: false,
  error: null,
  isAuthenticated: authService.isAuthenticated()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
