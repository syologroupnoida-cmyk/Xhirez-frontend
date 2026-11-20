import React from 'react';
import dynamic from 'next/dynamic';

const ForBusinessNew = dynamic(() => import('../views/forbusiness/ForBusinessNew'), { ssr: false });

function ForBusinessNewPage() {
  return (
    <div>
      <ForBusinessNew />
    </div>
  );
}

export default ForBusinessNewPage;
