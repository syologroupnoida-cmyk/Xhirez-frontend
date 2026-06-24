import React from 'react';
import dynamic from 'next/dynamic';

const AllJobsDashboard = dynamic(() => import('../views/ListingInterface/alljobsDashboard'), { ssr: false });

function AllJobsDashboardPage() {
  return (
    <div>
      <AllJobsDashboard />
    </div>
  );
}

export default AllJobsDashboardPage;
