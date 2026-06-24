import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const ManageSkills = dynamic(() => import('../../views/SuperAdmin/ManageSkills'), { ssr: false });

function ManageSkillsPage() {
  return (
    <SuperAdminDashboard>
      <ManageSkills />
    </SuperAdminDashboard>
  );
}

export default ManageSkillsPage;
