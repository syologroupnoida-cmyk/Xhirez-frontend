import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const ManageDesignation = dynamic(() => import('../../views/SuperAdmin/ManageDesignation'), { ssr: false });

function ManageDesignationPage() {
  return (
    <SuperAdminDashboard>
      <ManageDesignation />
    </SuperAdminDashboard>
  );
}

export default ManageDesignationPage;
