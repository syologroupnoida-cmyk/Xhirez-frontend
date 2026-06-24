import React from 'react';
import dynamic from 'next/dynamic';

const JobShare = dynamic(() => import('../../views/ShareProfile/jobShare'), { ssr: false });

function JobSharePage() {
  return (
    <div>
      <JobShare />
    </div>
  );
}

export default JobSharePage;
