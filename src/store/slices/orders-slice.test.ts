import reducer, { setOrders, deleteOrder } from './orders-slice';
import { OrderState } from '@/types';

describe('ordersSlice', () => {
  const initialState = { orders: [] as OrderState[] };

  const mockOrders: OrderState[] = [
    {
      id: 1,
      title: 'Order One',
      description: 'First order',
      date: '2025-09-28T12:00:00.000Z',
      products: [],
    },
    {
      id: 2,
      title: 'Order Two',
      description: 'Second order',
      date: '2025-09-29T15:30:00.000Z',
      products: [],
    },
  ];

  it('should return the initial state when passed an empty action', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setOrders', () => {
    const newState = reducer(initialState, setOrders(mockOrders));
    expect(newState.orders).toHaveLength(2);
    expect(newState.orders[0].title).toBe('Order One');
  });

  it('should handle deleteOrder', () => {
    const stateWithOrders = { orders: mockOrders };
    const newState = reducer(stateWithOrders, deleteOrder(1));
    expect(newState.orders).toHaveLength(1);
    expect(newState.orders[0].id).toBe(2);
  });

  it('should not delete if order id not found', () => {
    const stateWithOrders = { orders: mockOrders };
    const newState = reducer(stateWithOrders, deleteOrder(999));
    expect(newState.orders).toHaveLength(2);
  });
});
