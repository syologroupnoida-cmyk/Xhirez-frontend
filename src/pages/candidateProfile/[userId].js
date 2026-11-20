import React from 'react';
import dynamic from 'next/dynamic';

const CandidateDetails = dynamic(() => import('../../views/recruitment/CandidateDetails'), { ssr: false });

function CandidateDetailsPage() {
  return (
    <div>
      <CandidateDetails />
    </div>
  );
}

export default CandidateDetailsPage;
