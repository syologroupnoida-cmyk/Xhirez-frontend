import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const DeletedAdmins = dynamic(() => import('../../views/SuperAdmin/DeletedAdmins'), { ssr: false });

function DeletedAdminsPage() {
  return (
    <SuperAdminDashboard>
      <DeletedAdmins />
    </SuperAdminDashboard>
  );
}

export default DeletedAdminsPage;
