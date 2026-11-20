import React from 'react';
import dynamic from 'next/dynamic';

const Logout = dynamic(() => import('../components/header/Logout'), { ssr: false });

function LogoutPage() {
  return (
    <div>
      <Logout />
    </div>
  );
}

export default LogoutPage;
