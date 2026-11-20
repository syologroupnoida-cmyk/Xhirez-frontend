import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const DasboardContent = dynamic(() => import('../../views/SuperAdmin/DasboardContent'), { ssr: false });

function DasboardContentPage() {
  return (
    <SuperAdminDashboard>
      <DasboardContent />
    </SuperAdminDashboard>
  );
}

export default DasboardContentPage;
