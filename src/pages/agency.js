import React from 'react';
import dynamic from 'next/dynamic';

const Agency = dynamic(() => import('../views/foragency/foragency'), { ssr: false });

function AgencyPage() {
  return (
    <div>
      <Agency />
    </div>
  );
}

export default AgencyPage;
