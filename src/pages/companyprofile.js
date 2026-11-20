import React from 'react';
import dynamic from 'next/dynamic';

const CompanyProfile = dynamic(() => import('../views/Admin/CompanyProfile'), { ssr: false });

function CompanyProfilePage() {
  return (
    <div>
      <CompanyProfile />
    </div>
  );
}

export default CompanyProfilePage;
