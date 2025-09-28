import { renderHook, waitFor } from '@testing-library/react';
import { useOrders } from './use-orders';
import { Order, Product } from '@/types';


global.fetch = jest.fn();

describe('useOrders', () => {
  const mockOrders: Order[] = [
    { id: 1, title: 'Order 1', description: '', date: new Date('2025-09-28T12:00:00Z'), products: [] },
  ];

  const mockProducts: Product[] = [
    {
      id: 101,
      serialNumber: 123,
      isNew: true,
      photo: null,
      title: 'Product 1',
      type: 'Electronics',
      specification: null,
      guaranteeStart: new Date('2025-01-01T00:00:00Z'),
      guaranteeEnd: new Date('2026-01-01T00:00:00Z'),
      priceUSD: 100,
      priceUAH: 4000,
      orderId: 1,
      date: new Date('2025-09-28T12:00:00Z'),
    },
  ];

  beforeEach(() => {
    (fetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/api/orders') {
        return Promise.resolve({
          json: () => Promise.resolve(mockOrders),
        });
      }
      if (url === '/api/products') {
        return Promise.resolve({
          json: () => Promise.resolve(mockProducts),
        });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch orders and products and combine them', async () => {
    const { result } = renderHook(() => useOrders());

    
    expect(result.current.loading).toBe(true);
    expect(result.current.orders).toHaveLength(0);

    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toHaveLength(1);
    expect(result.current.orders[0].products).toHaveLength(1);
    expect(result.current.orders[0].products[0].title).toBe('Product 1');
  });

  it('should handle fetch error', async () => {
    (fetch as jest.Mock).mockImplementation(() => Promise.reject('API error'));

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.orders).toHaveLength(0);
  });
});
