import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const itemIndex = state.findIndex(item => item.product.id === product.id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += quantity;
      } else {
        state.push({ product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const itemIndex = state.findIndex(item => item.product.id === productId);
      if (itemIndex >= 0) {
        state.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.findIndex(item => item.product.id === productId);
      if (itemIndex >= 0) {
        state[itemIndex].quantity = quantity;
      }
    },
    resetCart: () => [],
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
