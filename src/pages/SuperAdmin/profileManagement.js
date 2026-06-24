import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const ProfileManagement = dynamic(() => import('../../views/SuperAdmin/AdminProfileManagement'), { ssr: false });

function ProfileManagementPage() {
  return (
    <SuperAdminDashboard>
      <ProfileManagement />
    </SuperAdminDashboard>
  );
}

export default ProfileManagementPage;
