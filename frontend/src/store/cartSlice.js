import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
          cartItemId: uuidv4()
        });
      }

      // Persist to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      calculateTotal(state);
    },

    removeFromCart: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
      calculateTotal(state);
    },

    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== productId);
        } else {
          item.quantity = quantity;
        }
        localStorage.setItem('cartItems', JSON.stringify(state.items));
        calculateTotal(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cartItems');
    }
  }
});

// Helper to calculate total
const calculateTotal = (state) => {
  state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
