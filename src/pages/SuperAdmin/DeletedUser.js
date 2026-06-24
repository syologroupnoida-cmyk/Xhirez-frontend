import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const DeletedUsers = dynamic(() => import('../../views/SuperAdmin/DeletedUsers'), { ssr: false });

function DeletedUsersPage() {
  return (
    <SuperAdminDashboard>
      <DeletedUsers />
    </SuperAdminDashboard>
  );
}

export default DeletedUsersPage;
