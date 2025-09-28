/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductItem } from './ProductItem';
import { ProductWithOrder } from '@/types';


jest.mock('@/styles/components/product-item.scss', () => ({}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/utils/helpers', () => ({
  formatGuaranteeDate: jest.fn((date: Date) => 'formatted-date'),
}));

const mockProduct: ProductWithOrder = {
  id: 1,
  serialNumber: 123,
  isNew: true,
  photo: null,
  title: 'Test Product',
  type: 'Electronics',
  specification: 'Specs',
  guaranteeStart: new Date('2023-01-01'),
  guaranteeEnd: new Date('2024-01-01'),
  priceUSD: 100,
  priceUAH: 4000,
  orderId: 1,
  date: new Date('2023-05-01'),
  order: {
    id: 1,
    title: 'Order 1',
    date: new Date('2023-04-01'),
  },
};

describe('ProductItem', () => {
  it('renders title, type and order title', () => {
    render(<ProductItem product={mockProduct} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/Order 1/i)).toBeInTheDocument();
  });

  it('renders formatted dates', () => {
    render(<ProductItem product={mockProduct} />);
    expect(screen.getAllByText('formatted-date').length).toBeGreaterThan(0);
  });

  it('calls onSelect when clicked', () => {
    const onSelectMock = jest.fn();
    render(<ProductItem product={mockProduct} onSelect={onSelectMock} />);

    fireEvent.click(screen.getByText(/Test Product/i));
    expect(onSelectMock).toHaveBeenCalledWith(mockProduct);
  });

  it('adds "shadow" class when selected', () => {
    const { container } = render(<ProductItem product={mockProduct} selected />);
    expect(container.firstChild).toHaveClass('shadow');
  });

  it('hides details if isShort is true', () => {
    render(<ProductItem product={mockProduct} isShort />);
    expect(screen.queryByText(/Order 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText('formatted-date')).not.toBeInTheDocument();
  });

  it('hides delete button if isHideDelete is true', () => {
    render(<ProductItem product={mockProduct} isHideDelete />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
