'use client';

import React from 'react';
import '@/styles/components/product-item.scss';
import Image from 'next/image';
import { DeleteButton } from '../ui';
import { ProductWithOrder } from '@/types';
import { formatGuaranteeDate } from '@/utils/helpers';
import { FormattedDate, FormattedPrice } from '.';

interface ProductItemProps {
  product: ProductWithOrder;
  selected?: boolean;
  onSelect?: (product: ProductWithOrder) => void;
  isShort?: boolean;
  isHideDelete?: boolean;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  selected = false,
  onSelect,
  isShort,
  isHideDelete,
}) => {
  const imageUrl = product.photo || '/assets/monitor.avif';
  const aspectRatio = 926 / 665;

  const guaranteeStart = formatGuaranteeDate(
    product.guaranteeStart,
    'dd / MM / yyyy',
  );
  const guaranteeEnd = formatGuaranteeDate(
    product.guaranteeEnd,
    'dd / MM / yy',
  );

  return (
    <div
      className={`product-item ${selected ? 'shadow' : ''}`}
      onClick={() => onSelect?.(product)}
      style={{ cursor: onSelect ? 'pointer' : 'default' }}
    >
      <div className="d-flex gap-2">
        <Image
          src={imageUrl}
          alt="product-image"
          width={40}
          height={Math.round(40 / aspectRatio)}
        />

        <div className="product-item__info">
          <h3 className="product-item__title">{product.title}</h3>
          <p className="product-item__type">{product.type}</p>
        </div>
      </div>

      {!isShort && (
        <>
          <div className="product-item__order">
            <p> {product.order?.title}</p>
          </div>

          <div className="product-item__guarantee">
            <div className="product-item__guarantee-row">
              <span className="label">с</span>
              <span className="date">{guaranteeStart}</span>
            </div>
            <div className="product-item__guarantee-row">
              <span className="label">по</span>
              <span className="date">{guaranteeEnd}</span>
            </div>
          </div>

          <FormattedPrice usd={product.priceUSD} uah={product.priceUAH} />
          <FormattedDate date={product.date} />
        </>
      )}
      {!isHideDelete && <DeleteButton />}
    </div>
  );
};
