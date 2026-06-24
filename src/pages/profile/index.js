import React from 'react';
import dynamic from 'next/dynamic';

const Profile = dynamic(() => import('../../views/profile/fillprofile'), { ssr: false });

function ProfilePage() {
  return (
    <div>
      <Profile />
    </div>
  );
}

export default ProfilePage;
