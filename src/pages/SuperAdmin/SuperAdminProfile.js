import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const SuperAdminProfile = dynamic(() => import('../../views/SuperAdmin/SuperAdminProfile'), { ssr: false });

function SuperAdminProfilePage() {
  return (
    <SuperAdminDashboard>
      <SuperAdminProfile />
    </SuperAdminDashboard>
  );
}

export default SuperAdminProfilePage;
