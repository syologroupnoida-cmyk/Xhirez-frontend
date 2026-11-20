import React from 'react';
import dynamic from 'next/dynamic';

const ProfileShare = dynamic(() => import('../../views/ShareProfile/profileShare'), { ssr: false });

function ProfileSharePage() {
  return (
    <div>
      <ProfileShare />
    </div>
  );
}

export default ProfileSharePage;
