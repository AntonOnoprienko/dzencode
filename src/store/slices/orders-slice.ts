import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '@/types';

interface OrdersState {
  list: Order[];
  openedOrderId: string | null;
}

const initialState: OrdersState = {
  list: [],
  openedOrderId: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.list = action.payload;
    },
    addOrder(state, action: PayloadAction<Order>) {
      state.list.push(action.payload);
    },
    removeOrder(state, action: PayloadAction<number>) {
      state.list = state.list.filter((o) => o.id !== action.payload);
    },
    openOrder(state, action: PayloadAction<string | null>) {
      state.openedOrderId = action.payload;
    },
  },
});

export const { setOrders, addOrder, removeOrder, openOrder } =
  ordersSlice.actions;
export default ordersSlice.reducer;
