import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../views/Admin/AdminDashboard'), { ssr: false });
const AdminChangePassword = dynamic(() => import('../../views/changePassword/AdminChangePassword'), { ssr: false });

function AdminChangePasswordPage() {
  return (
    <AdminDashboard>
      <AdminChangePassword />
    </AdminDashboard>
  );
}

export default AdminChangePasswordPage;
