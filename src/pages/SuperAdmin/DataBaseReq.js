import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const DatabaseRequest = dynamic(() => import('../../views/SuperAdmin/DatabaseRequest'), { ssr: false });

function DatabaseRequestPage() {
  return (
    <SuperAdminDashboard>
      <DatabaseRequest />
    </SuperAdminDashboard>
  );
}

export default DatabaseRequestPage;
