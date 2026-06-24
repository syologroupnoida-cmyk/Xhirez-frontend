import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const CampusbuddyData = dynamic(() => import('../../views/SuperAdmin/CampusBuddy'), { ssr: false });

function CampusbuddyDataPage() {
  return (
    <SuperAdminDashboard>
      <CampusbuddyData />
    </SuperAdminDashboard>
  );
}

export default CampusbuddyDataPage;
