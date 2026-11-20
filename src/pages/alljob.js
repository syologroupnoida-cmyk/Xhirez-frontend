import React from 'react';
import dynamic from 'next/dynamic';

const AllJobs = dynamic(() => import('../views/ListingInterface/alljobs'), { ssr: false });

function AllJobsPage() {
  return (
    <div>
      <AllJobs />
    </div>
  );
}

export default AllJobsPage;
