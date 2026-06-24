import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const UserManagement = dynamic(() => import('../../views/SuperAdmin/UserMangement'), { ssr: false });

function UserManagementPage() {
  return (
    <SuperAdminDashboard>
      <UserManagement />
    </SuperAdminDashboard>
  );
}

export default UserManagementPage;
