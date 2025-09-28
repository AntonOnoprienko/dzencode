'use client';

import dynamic from 'next/dynamic';
import React, { ReactNode } from 'react';

const AnimationWrapper = dynamic(
  () => import('../AnimationWrapper').then((mod) => mod.AnimationWrapper),
  {
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
  },
);

interface Props {
  children: ReactNode;
}

export const AnimationDynamic: React.FC<Props> = ({ children }) => {
  return <AnimationWrapper>{children}</AnimationWrapper>;
};
