'use client';

import '@/styles/components/products-list.scss';
import { ProductWithOrder } from '@/types';
import { AddButton } from '../ui';
import { ProductItem } from './ProductItem';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  items: ProductWithOrder[];
}

export const ProductsList = ({ items }: Props) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithOrder | null>(null);
  const [filterType, setFilterType] = useState<string>('');
  const t = useTranslations('products');

  const productTypes = Array.from(new Set(items.map((p) => p.type)));

  const filteredItems = filterType
    ? items.filter((p) => p.type === filterType)
    : items;

  return (
    <div className="px-5 py-3">
      <div className="d-flex align-items-center gap-2 mb-5">
        <AddButton size="small" />
        <h1>
          {t('title')} / {filteredItems.length}
        </h1>
        <div className="product-filter d-flex align-items-center gap-2 ms-5">
          <span className="product-filter__label">Тип:</span>
          <select
            className="form-select w-auto product-filter__select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">{t('selector')}</option>
            <option value="laptops">Laptops</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="orders-list flex-grow-1 d-flex flex-column gap-3">
        {filteredItems.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            selected={selectedProduct?.id === product.id}
            onSelect={() =>
              setSelectedProduct(
                selectedProduct?.id === product.id ? null : product,
              )
            }
          />
        ))}
      </div>
    </div>
  );
};
