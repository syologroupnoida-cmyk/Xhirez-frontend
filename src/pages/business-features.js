import React from 'react';
import dynamic from 'next/dynamic';

const ForBusinessFeatures = dynamic(() => import('../views/forbusiness/ForBusinessFeatures'), { ssr: false });

function ForBusinessFeaturesPage() {
  return (
    <div>
      <ForBusinessFeatures />
    </div>
  );
}

export default ForBusinessFeaturesPage;
