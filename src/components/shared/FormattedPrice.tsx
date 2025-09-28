import React from 'react';
import '@/styles/components/formatted-price.scss';

interface Props {
  usd: number;
  uah: number;
  className?: string;
}

export const FormattedPrice: React.FC<Props> = ({
  usd,
  uah,
  className = '',
}) => {
  return (
    <div className={`formatted-price ${className}`}>
      <p className="formatted-price__short">{usd} $</p>
      <div className="formatted-price__long">
        <span>{uah}</span>
        <span className="formatted-price__uah"> UAH</span>
      </div>
    </div>
  );
};
