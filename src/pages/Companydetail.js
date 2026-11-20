import React from 'react';
import dynamic from 'next/dynamic';

const Companydetail = dynamic(() => import('../views/recruitment/company-profile'), { ssr: false });

function CompanydetailPage() {
  return (
    <div>
      <Companydetail />
    </div>
  );
}

export default CompanydetailPage;
