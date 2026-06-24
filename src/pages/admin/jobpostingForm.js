import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../views/Admin/AdminDashboard'), { ssr: false });
const ManageNotifications = dynamic(() => import('../../views/SuperAdmin/ManageNotification'), { ssr: false });

function ManageNotificationsPage() {
  return (
    <AdminDashboard>
      <ManageNotifications />
    </AdminDashboard>
  );
}

export default ManageNotificationsPage;
