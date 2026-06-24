import React from 'react';
import dynamic from 'next/dynamic';

const ProfileDashboard = dynamic(() => import('../views/profile/profile-dashboard'), { ssr: false });

function ProfileDashboardPage() {
  return (
    <div>
      <ProfileDashboard />
    </div>
  );
}

export default ProfileDashboardPage;
