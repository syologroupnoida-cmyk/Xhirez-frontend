import React from 'react';
import dynamic from 'next/dynamic';

const Candudatedeatil = dynamic(() => import('../views/recruitment/advancecandidate'), { ssr: false });

function CandudatedeatilPage() {
  return (
    <div>
      <Candudatedeatil />
    </div>
  );
}

export default CandudatedeatilPage;
