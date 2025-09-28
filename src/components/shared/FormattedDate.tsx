'use client';

import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import '@/styles/components/formatted-date.scss';

interface FormattedDateProps {
  date: Date | string;
  className?: string;
}

export const FormattedDate: React.FC<FormattedDateProps> = ({
  date,
  className,
}) => {
  const parsed = new Date(date);
  const short = format(parsed, 'dd/MM');
  const long = format(parsed, 'dd / MMM / yyyy', { locale: ru });

  return (
    <div className={`formatted-date ${className ?? ''}`}>
      <p className="formatted-date-short">{short}</p>
      <p className="formatted-date-long">{long}</p>
    </div>
  );
};
