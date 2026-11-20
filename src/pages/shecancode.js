import React from 'react';
import dynamic from 'next/dynamic';

const Shecancode = dynamic(() => import('../views/shecancode/shecancode'), { ssr: false });

function ShecancodePage() {
  return (
    <div>
      <Shecancode />
    </div>
  );
}

export default ShecancodePage;
