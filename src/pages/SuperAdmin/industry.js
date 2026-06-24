import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const IndustryManagement = dynamic(() => import('../../views/SuperAdmin/industryManagement'), { ssr: false });

function IndustryManagementPage() {
  return (
    <SuperAdminDashboard>
      <IndustryManagement />
    </SuperAdminDashboard>
  );
}

export default IndustryManagementPage;
