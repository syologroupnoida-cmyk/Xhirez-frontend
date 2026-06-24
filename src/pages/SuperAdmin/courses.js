import React from 'react';
import dynamic from 'next/dynamic';

const SuperAdminDashboard = dynamic(() => import('../../views/SuperAdmin/SuperAdminDashboard'), { ssr: false });
const QualificationManagement = dynamic(() => import('../../views/SuperAdmin/ManageCourses'), { ssr: false });

function QualificationManagementPage() {
  return (
    <SuperAdminDashboard>
      <QualificationManagement />
    </SuperAdminDashboard>
  );
}

export default QualificationManagementPage;
