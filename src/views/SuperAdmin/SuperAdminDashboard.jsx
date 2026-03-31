import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './SuperAdminSidebar';
import TopNavbar from './TopNavbar';
import { Toaster } from 'react-hot-toast';

const SuperAdminDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Content */}
        <Container
          fluid
          className="py-6 px-4 sm:px-6 lg:px-8 custom-scrollbar"
          style={{
            marginTop: '64px', // Matches navbar height
            minHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;