import { Order, OrderState } from '@/types';
import { format } from 'date-fns';

export const formatGuaranteeDate = (
  date: Date | string,
  pattern = 'dd / MM / yy',
) => {
  return format(new Date(date), pattern);
};

export const getOrderSums = (
  products: { priceUSD: number; priceUAH: number }[],
) => ({
  sumUSD: products.reduce((acc, p) => acc + p.priceUSD, 0),
  sumUAH: products.reduce((acc, p) => acc + p.priceUAH, 0),
});

export const deserializeOrders = (orders: OrderState[]): Order[] =>
  orders.map((order): Order => ({
    ...order,
    date: new Date(order.date),
    products: order.products.map((p): Order['products'][number] => ({
      ...p,
      guaranteeStart: new Date(p.guaranteeStart),
      guaranteeEnd: new Date(p.guaranteeEnd),
      date: new Date(p.date),
    })),
  }));

export const serializeOrders = (orders: Order[]): OrderState[] =>
  orders.map((order): OrderState => ({
    ...order,
    date: order.date.toISOString(),
    products: order.products.map((p): OrderState['products'][number] => ({
      ...p,
      guaranteeStart: p.guaranteeStart.toISOString(),
      guaranteeEnd: p.guaranteeEnd.toISOString(),
      date: p.date.toISOString(),
    })),
  }));


