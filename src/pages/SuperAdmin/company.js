import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const CompanyManagement = dynamic(() => import('../../views/SuperAdmin/companyManagement'), { ssr: false });

function CompanyManagementPage() {
  return (
    <SuperAdminDashboard>
      <CompanyManagement />
    </SuperAdminDashboard>
  );
}

export default CompanyManagementPage;
