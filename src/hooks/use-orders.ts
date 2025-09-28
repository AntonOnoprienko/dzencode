'use client';

import { Order, Product } from '@/types';
import { useState, useEffect } from 'react';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const resOrders = await fetch('/api/orders');
        const ordersData: Order[] = await resOrders.json();

        const resProducts = await fetch('/api/products');
        const productsData: Product[] = await resProducts.json();

        const ordersWithProducts = ordersData.map((order) => ({
          ...order,
          products: productsData.filter((p) => p.orderId === order.id),
        }));

        setOrders(ordersWithProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading };
};
