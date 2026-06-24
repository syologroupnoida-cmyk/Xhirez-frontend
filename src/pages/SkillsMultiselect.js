import React from 'react';
import dynamic from 'next/dynamic';

const SkillsMultiselect = dynamic(() => import('../views/hompage/data'), { ssr: false });

function SkillsMultiselectPage() {
  return (
    <div>
      <SkillsMultiselect />
    </div>
  );
}

export default SkillsMultiselectPage;
