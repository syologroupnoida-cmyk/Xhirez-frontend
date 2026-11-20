import React from 'react';
import dynamic from 'next/dynamic';

const RecruiterLogin = dynamic(() => import('../views/recruitment/recruiterlogin'), { ssr: false });

function RecruiterLoginPage() {
  return (
    <div>
      <RecruiterLogin />
    </div>
  );
}

export default RecruiterLoginPage;
