/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Сериализация: Date → string
export const serializeDates = <T>(obj: T): any => {
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(serializeDates);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, serializeDates(v)])
    );
  }
  return obj;
};

// Десериализация: string → Date
export const deserializeDates = <T>(obj: any): T => {
  if (typeof obj === 'string' && !isNaN(Date.parse(obj))) {
    return new Date(obj) as unknown as T;
  }
  if (Array.isArray(obj)) return obj.map(deserializeDates) as unknown as T;
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, deserializeDates(v)])
    ) as T;
  }
  return obj as T;
};




