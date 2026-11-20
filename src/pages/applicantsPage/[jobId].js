import React from 'react';
import dynamic from 'next/dynamic';

const ApplicantsPage = dynamic(() => import('../../views/recruitment/appliedcandidate'), { ssr: false });

function ApplicantsPagePage() {
  return (
    <div>
      <ApplicantsPage />
    </div>
  );
}

export default ApplicantsPagePage;
