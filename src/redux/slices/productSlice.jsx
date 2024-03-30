import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newItem = action.payload;
        state.products.push(newItem);
    }
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;