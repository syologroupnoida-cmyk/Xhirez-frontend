import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const ManageDepartment = dynamic(() => import('../../views/SuperAdmin/ManageDepartment'), { ssr: false });

function ManageDepartmentPage() {
  return (
    <SuperAdminDashboard>
      <ManageDepartment />
    </SuperAdminDashboard>
  );
}

export default ManageDepartmentPage;
