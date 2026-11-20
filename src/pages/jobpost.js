import React from 'react';
import dynamic from 'next/dynamic';

const Jobpost = dynamic(() => import('../views/recruitment/job-posting'), { ssr: false });

function JobpostPage() {
  return (
    <div>
      <Jobpost />
    </div>
  );
}

export default JobpostPage;
