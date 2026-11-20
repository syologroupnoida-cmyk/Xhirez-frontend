import React from 'react';
import dynamic from 'next/dynamic';

const JobListInterface = dynamic(() => import('../views/ListingInterface/JobListInterface'), { ssr: false });

function JobListInterfacePage() {
  return (
    <div>
      <JobListInterface />
    </div>
  );
}

export default JobListInterfacePage;
