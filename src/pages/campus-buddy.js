import React from 'react';
import dynamic from 'next/dynamic';

const Campusbuddy = dynamic(() => import('../views/campusBuddy/campusbuddy'), { ssr: false });

function CampusbuddyPage() {
  return (
    <div>
      <Campusbuddy />
    </div>
  );
}

export default CampusbuddyPage;
