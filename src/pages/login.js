import React from 'react';
import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('../views/loginpage/login'), { ssr: false });

function LoginPagePage() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default LoginPagePage;
