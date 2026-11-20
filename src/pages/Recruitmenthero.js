import React from 'react';
import dynamic from 'next/dynamic';

const Recruitmenthero = dynamic(() => import('../views/hompage/recruitment-home'), { ssr: false });

function RecruitmentheroPage() {
  return (
    <div>
      <Recruitmenthero />
    </div>
  );
}

export default RecruitmentheroPage;
