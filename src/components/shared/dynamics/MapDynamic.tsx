'use client';

import dynamic from 'next/dynamic';

const MyMapComponent = dynamic(
  () => import('../MyMap').then((mod) => mod.MyMap),
  {
    ssr: false,
    loading: () => (
      <div className="d-flex align-items-center">
        <span
          className="spinner-border spinner-border-sm text-success me-3"
          role="status"
        ></span>
        <span>Loading...</span>
      </div>
    ),
  },
);

export const MapDynamic = () => {
  return <MyMapComponent />;
};
