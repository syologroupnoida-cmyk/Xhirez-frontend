import React from "react";
import dynamic from "next/dynamic";

const RecruiterSignUp = dynamic(() => import("../../views/recruiter/RecruiterSignUp"), { ssr: false });

function RecruiterSignUpPage() {
  return <RecruiterSignUp />;
}

export default RecruiterSignUpPage;
