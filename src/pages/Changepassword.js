import React from 'react';
import dynamic from 'next/dynamic';

const ChangePasswordPage = dynamic(() => import('../views/changePassword/changepassword'), { ssr: false });

function ChangePasswordPagePage() {
  return (
    <div>
      <ChangePasswordPage />
    </div>
  );
}

export default ChangePasswordPagePage;
