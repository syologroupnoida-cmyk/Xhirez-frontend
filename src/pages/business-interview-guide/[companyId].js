import React from 'react';
import dynamic from 'next/dynamic';

const CompanyDetails = dynamic(() => import('../../views/forbusiness/CompanyDetails'), { ssr: false });

function CompanyDetailsPage() {
  return (
    <div>
      <CompanyDetails />
    </div>
  );
}

export default CompanyDetailsPage;
