import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../views/Admin/AdminDashboard'), { ssr: false });
const MainContent = dynamic(() => import('../../views/Admin/MainContent'), { ssr: false });

function MainContentPage() {
  return (
    <AdminDashboard>
      <MainContent />
    </AdminDashboard>
  );
}

export default MainContentPage;
