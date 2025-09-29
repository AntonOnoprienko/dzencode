'use client';

import React, { useEffect, useState } from 'react';
import { Order } from '@/types';
import { DeleteOrderModal, OrderDetailsPanel, OrderItem } from '.';
import '@/styles/components/orders-list.scss';
import { AddButton } from '../ui';
import { deleteOrder, setOrders } from '@/store/slices/orders-slice';
import { deserializeOrders, serializeOrders } from '@/utils/helpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

interface Props {
  items: Order[];
}

const OrdersChart = dynamic(() => import('./OrdersChart').then(mod => mod.OrdersChart), {
  ssr: false,
  loading: () => (
    <div>
      <span
        className="spinner-border spinner-border-sm text-success me-3"
        role="status"
      ></span>
      <span>Loading...</span>
    </div>
  ),
});

export const OrdersList: React.FC<Props> = ({ items }) => {
  const dispatch = useAppDispatch();
  const ordersState = useAppSelector((state) => state.orders.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteOrderModal, setDeleteOrderModal] = useState<Order | null>(null);
  const [showChart, setShowChart] = useState<boolean>(false);
  const t = useTranslations('orders');

  useEffect(() => {
    if (items?.length) {
      dispatch(setOrders(serializeOrders(items)));
    }
  }, [items, dispatch]);

  const orders = deserializeOrders(ordersState);
  const chartOrders = orders.map((order) => ({
    id: order.id,
    name: order.title,
    totalUSD: order.products?.reduce((sum, p) => sum + p.priceUSD, 0) || 0,
  }));

  if (!items) return null;

  return (
    <div className="px-5 py-3">
      <div className="d-flex align-items-center gap-2 mb-3">
        <AddButton size="small" />
        <h1>
          {t('orders_title')} / {orders.length}
        </h1>
        <button
          className="btn btn-success ms-5"
          onClick={() => setShowChart((prev) => !prev)}
        >
          {showChart ? t('chart_hide') : t('chart_show')}
        </button>
      </div>

      <div className="d-flex">
        <DeleteOrderModal
          order={deleteOrderModal}
          show={!!deleteOrderModal}
          onHide={() => setDeleteOrderModal(null)}
          onDelete={(id) => {
            dispatch(deleteOrder(id));
            setDeleteOrderModal(null);
            if (selectedOrder?.id === id) setSelectedOrder(null);
          }}
        />

        {showChart && <OrdersChart orders={chartOrders} />}

        {!showChart && (
          <div className="orders-list flex-grow-1">
            {orders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                selected={selectedOrder?.id === order.id}
                anySelected={selectedOrder !== null}
                onSelect={() =>
                  setSelectedOrder(
                    selectedOrder?.id === order.id ? null : order,
                  )
                }
                onDelete={() => setDeleteOrderModal(order)}
              />
            ))}
          </div>
        )}

        {selectedOrder && (
          <OrderDetailsPanel
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onAddProduct={() => console.log('Add product clicked')}
          />
        )}
      </div>
    </div>
  );
};
