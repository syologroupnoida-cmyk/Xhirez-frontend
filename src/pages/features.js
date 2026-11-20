import React from 'react';
import dynamic from 'next/dynamic';

const Features = dynamic(() => import('../views/feature/features'), { ssr: false });

function FeaturesPage() {
  return (
    <div>
      <Features />
    </div>
  );
}

export default FeaturesPage;
