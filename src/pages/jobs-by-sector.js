import React from 'react';
import dynamic from 'next/dynamic';

const JobListBySectors = dynamic(() => import('../views/hompage/JobListBySectors'), { ssr: false });

function JobListBySectorsPage() {
  return (
    <div>
      <JobListBySectors />
    </div>
  );
}

export default JobListBySectorsPage;
