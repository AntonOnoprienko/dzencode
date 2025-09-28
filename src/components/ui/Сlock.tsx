'use client';

import React, { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'react-bootstrap-icons';

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});

export const Clock = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!now) return null;

  const day = now.getDate().toString().padStart(2, '0');
  const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const year = now.getFullYear();

  return (
    <div className="small">
      <p className="mb-1">Today</p>
      <div className="d-flex align-items-center gap-2">
        <b>{day}</b>
        <span>
          {month}, {year}
        </span>
        <ClockIcon color="green" size={16} className="ms-2" />
        <span>{timeFormatter.format(now)}</span>
      </div>
    </div>
  );
};
