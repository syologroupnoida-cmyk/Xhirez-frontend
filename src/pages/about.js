import React from 'react';
import dynamic from 'next/dynamic';

const AboutUs = dynamic(() => import('../views/about/AboutUs'), { ssr: false });

function AboutUsPage() {
  return (
    <div>
      <AboutUs />
    </div>
  );
}

export default AboutUsPage;
