import React from 'react';
import dynamic from 'next/dynamic';

const BookmarkUsers = dynamic(() => import('../views/recruitment/BookmarkUsers'), { ssr: false });

function BookmarkUsersPage() {
  return (
    <div>
      <BookmarkUsers />
    </div>
  );
}

export default BookmarkUsersPage;
