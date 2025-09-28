import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface ProductsState {
  list: Product[];
  filterType: string | null;
}

const initialState: ProductsState = {
  list: [],
  filterType: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.list.push(action.payload);
    },
    setFilterType(state, action: PayloadAction<string | null>) {
      state.filterType = action.payload;
    },
  },
});

export const { setProducts, addProduct, setFilterType } = productsSlice.actions;
export default productsSlice.reducer;
