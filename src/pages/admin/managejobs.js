import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../views/Admin/AdminDashboard'), { ssr: false });
const ManageJobs = dynamic(() => import('../../views/Admin/ManageJobs'), { ssr: false });

function ManageJobsPage() {
  return (
    <AdminDashboard>
      <ManageJobs />
    </AdminDashboard>
  );
}

export default ManageJobsPage;
