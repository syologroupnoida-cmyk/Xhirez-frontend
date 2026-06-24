import React from 'react';
import dynamic from 'next/dynamic';

const AdvanceSearch = dynamic(() => import('../views/recruitment/advance'), { ssr: false });

function AdvanceSearchPage() {
  return (
    <div>
      <AdvanceSearch />
    </div>
  );
}

export default AdvanceSearchPage;
