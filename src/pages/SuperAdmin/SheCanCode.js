import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const SheCanCodeData = dynamic(() => import('../../views/SuperAdmin/SheCanCode'), { ssr: false });

function SheCanCodeDataPage() {
  return (
    <SuperAdminDashboard>
      <SheCanCodeData />
    </SuperAdminDashboard>
  );
}

export default SheCanCodeDataPage;
