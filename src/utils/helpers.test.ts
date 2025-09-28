import {
  formatGuaranteeDate,
  getOrderSums,
  deserializeOrders,
  serializeOrders,
} from './helpers';
import { Order, OrderState } from '@/types';


describe('formatGuaranteeDate', () => {
  it('formats Date object correctly', () => {
    const date = new Date('2025-09-28T00:00:00Z');
    expect(formatGuaranteeDate(date, 'yyyy-MM-dd')).toBe('2025-09-28');
  });

  it('formats string date correctly', () => {
    const dateStr = '2025-09-28T10:15:00Z';
    expect(formatGuaranteeDate(dateStr, 'dd.MM.yyyy')).toBe('28.09.2025');
  });
});


describe('getOrderSums', () => {
  it('calculates sums in USD and UAH', () => {
    const products = [
      { priceUSD: 100, priceUAH: 4000 },
      { priceUSD: 50, priceUAH: 2000 },
    ];

    expect(getOrderSums(products)).toEqual({
      sumUSD: 150,
      sumUAH: 6000,
    });
  });

  it('returns 0 sums for empty array', () => {
    expect(getOrderSums([])).toEqual({ sumUSD: 0, sumUAH: 0 });
  });
});


describe('serializeOrders / deserializeOrders', () => {
  const mockOrders: Order[] = [
    {
      id: 1,
      title: 'Test Order',
      description: 'Some description',
      date: new Date('2025-09-28T12:00:00Z'),
      products: [
        {
          id: 101,
          serialNumber: 12345,
          isNew: true,
          photo: null,
          title: 'Product 1',
          type: 'Electronics',
          specification: 'Spec A',
          guaranteeStart: new Date('2025-01-01T00:00:00Z'),
          guaranteeEnd: new Date('2026-01-01T00:00:00Z'),
          priceUSD: 100,
          priceUAH: 4000,
          orderId: 1,
          date: new Date('2025-09-28T12:00:00Z'),
        },
      ],
    },
  ];

  it('serializes orders to OrderState', () => {
    const serialized: OrderState[] = serializeOrders(mockOrders);

    expect(serialized[0].date).toBe('2025-09-28T12:00:00.000Z');
    expect(serialized[0].products[0].guaranteeStart).toBe('2025-01-01T00:00:00.000Z');
    expect(serialized[0].products[0].title).toBe('Product 1');
  });

  it('deserializes orders back to Order', () => {
    const serialized = serializeOrders(mockOrders);
    const deserialized = deserializeOrders(serialized);

    expect(deserialized[0].date).toBeInstanceOf(Date);
    expect(deserialized[0].products[0].guaranteeEnd).toBeInstanceOf(Date);
    expect(deserialized[0].products[0].title).toBe('Product 1');
  });

  it('serialize -> deserialize returns equivalent data', () => {
    const serialized = serializeOrders(mockOrders);
    const deserialized = deserializeOrders(serialized);

    expect(deserialized[0].id).toBe(mockOrders[0].id);
    expect(deserialized[0].products[0].serialNumber).toBe(12345);
  });
});
