import React from 'react';
import dynamic from 'next/dynamic';

const SheCanCode = dynamic(() => import('../views/SheCanCode/SheCanCode'), { ssr: false });

function SheCanCodePage() {
  return (
    <div>
      <SheCanCode />
    </div>
  );
}

export default SheCanCodePage;
