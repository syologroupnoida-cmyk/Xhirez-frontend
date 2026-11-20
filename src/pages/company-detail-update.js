import React from 'react';
import dynamic from 'next/dynamic';

const Companydetailupdate = dynamic(() => import('../views/recruitment/company-profile-update'), { ssr: false });

function CompanydetailupdatePage() {
  return (
    <div>
      <Companydetailupdate />
    </div>
  );
}

export default CompanydetailupdatePage;
