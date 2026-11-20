import React from 'react';
import dynamic from 'next/dynamic';

const RecruiterSignUp = dynamic(() => import('../views/recruiter/RecruiterSignUp'), { ssr: false });

function RecruitersignUpPage() {
  return (
    <div>
      <RecruiterSignUp />
    </div>
  );
}

export default RecruitersignUpPage;
