import React from 'react';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('../views/hompage/home'), { ssr: false });

function HomePagePage() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default HomePagePage;
