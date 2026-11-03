import React from "react";
import dynamic from "next/dynamic";

const Register = dynamic(() => import("../views/signup/Register"), { ssr: false });

export default function RegisterPage() {
  return <Register />;
}