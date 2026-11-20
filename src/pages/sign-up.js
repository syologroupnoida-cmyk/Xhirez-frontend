import React from 'react';
import dynamic from 'next/dynamic';

const SignUpPage = dynamic(() => import('../views/signup/signUp'), { ssr: false });

function SignUpPagePage() {
  return (
    <div>
      <SignUpPage />
    </div>
  );
}

export default SignUpPagePage;
