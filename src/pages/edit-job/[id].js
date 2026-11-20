import React from 'react';
import dynamic from 'next/dynamic';

const EditJob = dynamic(() => import('../../views/recruitment/editJob'), { ssr: false });

function EditJobPage() {
  return (
    <div>
      <EditJob />
    </div>
  );
}

export default EditJobPage;
