import React from 'react';
import dynamic from 'next/dynamic';

const CareerCounselling = dynamic(() => import('../views/career-counselling/CareerCounselling'), { ssr: false });

function CareerCounsellingPage() {
  return (
    <div>
      <CareerCounselling />
    </div>
  );
}

export default CareerCounsellingPage;
