import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from '@/types';

interface OrdersSliceState {
  orders: OrderState[];
}

const initialState: OrdersSliceState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderState[]>) => {
      state.orders = action.payload;
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload,
      );
    },
  },
});

export const { setOrders, deleteOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
