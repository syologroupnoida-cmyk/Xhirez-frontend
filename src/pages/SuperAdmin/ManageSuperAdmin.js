import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const SuperAdminManagement = dynamic(() => import('../../views/SuperAdmin/SuperAdminManagement'), { ssr: false });

function SuperAdminManagementPage() {
  return (
    <SuperAdminDashboard>
      <SuperAdminManagement />
    </SuperAdminDashboard>
  );
}

export default SuperAdminManagementPage;
