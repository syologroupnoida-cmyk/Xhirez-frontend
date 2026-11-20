import React from 'react';
import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../views/Admin/AdminDashboard'), { ssr: false });
const CompanyProfile = dynamic(() => import('../../views/Admin/CompanyProfile'), { ssr: false });

function CompanyProfilePage() {
  return (
    <AdminDashboard>
      <CompanyProfile />
    </AdminDashboard>
  );
}

export default CompanyProfilePage;
