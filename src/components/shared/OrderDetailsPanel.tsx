'use client';

import React from 'react';
import { Order } from '@/types';
import { ProductItem } from '.';
import { X } from 'react-bootstrap-icons';
import '@/styles/components/order-details-panel.scss';

interface Props {
  order: Order;
  onClose: () => void;
  onAddProduct?: () => void;
}

export const OrderDetailsPanel: React.FC<Props> = ({
  order,
  onClose,
  onAddProduct = () => {},
}) => {
  if (!order) return null;

  return (
    <div
      className={`order-details-panel ms-3 border-start shadow position-relative ${order ? 'open' : ''}`}
    >
      <div className="p-3">
        <h5 className="my-3">{order.title}</h5>
        <div className="d-flex gap-1 text-success align-items-center">
          <button
            type="button"
            className="order-details-panel__add-button"
            onClick={onAddProduct}
          >
            +
          </button>
          <p className="small ms-1">Добавить продукт</p>
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        {order.products.map((product) => (
          <ProductItem key={product.id} product={product} isShort />
        ))}
      </div>

      <div>
        <button className="order-details-panel__close-button" onClick={onClose}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
