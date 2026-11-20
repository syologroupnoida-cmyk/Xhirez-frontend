import React from 'react';
import dynamic from 'next/dynamic';

const Otpcodesent = dynamic(() => import('../views/verificationPage/sendcode'), { ssr: false });

function OtpcodesentPage() {
  return (
    <div>
      <Otpcodesent />
    </div>
  );
}

export default OtpcodesentPage;
