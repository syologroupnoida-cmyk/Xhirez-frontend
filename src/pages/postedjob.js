import React from 'react';
import dynamic from 'next/dynamic';

const Postedjob = dynamic(() => import('../views/recruitment/postedjobs'), { ssr: false });

function PostedjobPage() {
  return (
    <div>
      <Postedjob />
    </div>
  );
}

export default PostedjobPage;
