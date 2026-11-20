import React from 'react';
import dynamic from 'next/dynamic';

const Fillprofile = dynamic(() => import('../views/profile/fillprofile'), { ssr: false });

function FillprofilePage() {
  return (
    <div>
      <Fillprofile />
    </div>
  );
}

export default FillprofilePage;
