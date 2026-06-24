import React from 'react';
import dynamic from 'next/dynamic';

const Advancejoblist = dynamic(() => import('../views/recruitment/advancejoblist'), { ssr: false });

function AdvancejoblistPage() {
  return (
    <div>
      <Advancejoblist />
    </div>
  );
}

export default AdvancejoblistPage;
