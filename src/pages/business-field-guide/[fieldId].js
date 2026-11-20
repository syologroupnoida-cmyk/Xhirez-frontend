import React from 'react';
import dynamic from 'next/dynamic';

const FieldDetails = dynamic(() => import('../../views/forbusiness/FieldDetails'), { ssr: false });

function FieldDetailsPage() {
  return (
    <div>
      <FieldDetails />
    </div>
  );
}

export default FieldDetailsPage;
