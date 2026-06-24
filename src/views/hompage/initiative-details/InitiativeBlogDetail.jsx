import React from 'react';
import { useParams, Link } from "@/router-dom";
import initiatives from '../../../data/initiativesData.js';
import UnifiedHeader from '../../../components/header/UnifiedHeader';
import Footer from '../../../components/footer/footer';

const InitiativeBlogDetail = () => {
  const { initiativeTitle, blogIndex } = useParams();

  // Decode the URL parameters
  const decodedInitiativeTitle = decodeURIComponent(initiativeTitle);
  const decodedBlogIndex = parseInt(blogIndex, 10);

  // Find the initiative
  const initiative = initiatives.find(
    (item) => item.title.toLowerCase().replace(/\s/g, '-') === decodedInitiativeTitle.toLowerCase().replace(/\s/g, '-')
  );

  // Find the specific blog post
  const blog = initiative?.blogs[decodedBlogIndex];

  if (!initiative || !blog) {
    return (
      <>
        <UnifiedHeader />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-xl text-gray-700">Blog post not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <UnifiedHeader />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 pb-4">
            {blog.title}
          </h1>
          <img
            src={`/${blog.imageUrl}`} // Assuming imageUrl is relative to public folder
            alt={blog.title}
            className="w-full h-80 object-cover rounded-lg mb-8 shadow-sm"
          />
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {blog.description}
          </p>
          {/* Add more detailed content here if available, e.g., from a 'fullContent' field in your data */}
          <div className="text-gray-600 text-sm mt-10 pt-6 border-t">
            <p><strong>Initiative:</strong> {initiative.title}</p>
            {/* You can add more meta-information here */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InitiativeBlogDetail;