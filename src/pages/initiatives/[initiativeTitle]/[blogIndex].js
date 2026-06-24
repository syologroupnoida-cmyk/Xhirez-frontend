import React from 'react';
import dynamic from 'next/dynamic';

const InitiativeBlogDetail = dynamic(() => import('../../../views/hompage/initiative-details/InitiativeBlogDetail'), { ssr: false });

function InitiativeBlogDetailPage() {
  return (
    <div>
      <InitiativeBlogDetail />
    </div>
  );
}

export default InitiativeBlogDetailPage;
