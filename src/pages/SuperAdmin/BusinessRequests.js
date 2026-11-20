import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const BuisnessRequest = dynamic(() => import('../../views/SuperAdmin/businessRequest'), { ssr: false });

function BuisnessRequestPage() {
  return (
    <SuperAdminDashboard>
      <BuisnessRequest />
    </SuperAdminDashboard>
  );
}

export default BuisnessRequestPage;
