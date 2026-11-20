import React from "react";
import dynamic from "next/dynamic";

const SignUp = dynamic(() => import("../views/signup/signUp"), { ssr: false });

export default function SignUpPage() {
  return (
    <div>
      <SignUp />
    </div>
  );
}