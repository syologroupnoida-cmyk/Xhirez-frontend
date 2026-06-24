import React from 'react';
import dynamic from 'next/dynamic';

const Applyjob = dynamic(() => import('../../views/jobapply/jobapply'), { ssr: false });

function ApplyjobPage() {
  return (
    <div>
      <Applyjob />
    </div>
  );
}

export default ApplyjobPage;
