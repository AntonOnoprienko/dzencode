'use client';

import '@/styles/components/order-item.scss';
import React from 'react';
import { ListTask } from 'react-bootstrap-icons';
import { DeleteButton } from '../ui/DeleteButton';
import { Order } from '@/types';
import { getOrderSums } from '@/utils/helpers';
import { FormattedDate, FormattedPrice } from '.';

interface OrderItemProps {
  order: Order;
  selected: boolean;
  anySelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  order,
  selected,
  anySelected,
  onSelect,
  onDelete,
}) => {
  const { sumUSD, sumUAH } = getOrderSums(order.products);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`order-item my-3 ${selected ? 'shadow' : ''} ${anySelected ? 'justify-content-start' : ''}`}
    >
      {!anySelected && <h2 className="order-item__title">{order.title}</h2>}

      <div className="d-flex align-items-center">
        <div className="order-item__icon">
          <ListTask size={24} />
        </div>
        <div>
          <p className="order-item__quantity">{order.products.length}</p>
          <p className="order-item__label">Продукта</p>
        </div>
      </div>

      <FormattedDate
        date={order.date}
        className={anySelected ? 'items-start' : ''}
      />

      {!anySelected && (
        <>
          <FormattedPrice usd={sumUSD} uah={sumUAH} />
          <DeleteButton onClick={onDelete} />
        </>
      )}

      {selected && (
        <div
          className="order-item__selected"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        ></div>
      )}
    </div>
  );
};
