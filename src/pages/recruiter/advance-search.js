import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function AdvanceSearchPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/recruiter/advanced-search');
  }, [router]);

  return null;
}

export default AdvanceSearchPage;
