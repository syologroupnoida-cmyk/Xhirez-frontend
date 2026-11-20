import React from "react";
import dynamic from "next/dynamic";

const JobPost = dynamic(() => import("../views/job-post/JobForm"), { ssr: false });

function JobPostPage() {
  return <JobPost />;
}

export default JobPostPage;
