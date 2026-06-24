import React from 'react';
import dynamic from 'next/dynamic';

const Popup = dynamic(() => import('../views/recruitment/popup'), { ssr: false });

function PopupPage() {
  return (
    <div>
      <Popup />
    </div>
  );
}

export default PopupPage;
