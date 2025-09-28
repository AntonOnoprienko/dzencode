'use client';

import React, { useState } from 'react';
import { Order } from '@/types';
import { DeleteOrderModal, OrderDetailsPanel, OrderItem } from '.';
import '@/styles/components/orders-list.scss';
import { AddButton } from '../ui';

interface Props {
  items: Order[];
  onDelete?: (id: number) => void;
}

export const OrdersList: React.FC<Props> = ({ items, onDelete = () => {} }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<Order | null>(null);

  if (!items) return null;

  return (
    <div className="px-5 py-3">
      <div className="d-flex align-items-center gap-2 mb-5">
        <AddButton size="small" />
        <h1>Приходы / {items.length}</h1>
      </div>

      <div className="d-flex">
        <DeleteOrderModal
          order={deleteOrder}
          show={!!deleteOrder}
          onHide={() => setDeleteOrder(null)}
          onDelete={(id) => {
            onDelete(id);
            setDeleteOrder(null);
            if (selectedOrder?.id === id) setSelectedOrder(null);
          }}
        />

        <div className="orders-list flex-grow-1">
          {items.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              selected={selectedOrder?.id === order.id}
              anySelected={selectedOrder !== null}
              onSelect={() =>
                setSelectedOrder(selectedOrder?.id === order.id ? null : order)
              }
              onDelete={() => setDeleteOrder(order)}
            />
          ))}
        </div>

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
