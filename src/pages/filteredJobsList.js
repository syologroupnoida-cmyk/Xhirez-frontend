import React from 'react';
import dynamic from 'next/dynamic';

const FilteredJobsList = dynamic(() => import('../views/ListingInterface/filteredJobList'), { ssr: false });

function FilteredJobsListPage() {
  return (
    <div>
      <FilteredJobsList />
    </div>
  );
}

export default FilteredJobsListPage;
