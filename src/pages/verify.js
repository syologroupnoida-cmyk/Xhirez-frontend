import React from 'react';
import dynamic from 'next/dynamic';

const OTPVerificationPage = dynamic(() => import('../views/verificationPage/varifycode'), { ssr: false });

function OTPVerificationPagePage() {
  return (
    <div>
      <OTPVerificationPage />
    </div>
  );
}

export default OTPVerificationPagePage;
