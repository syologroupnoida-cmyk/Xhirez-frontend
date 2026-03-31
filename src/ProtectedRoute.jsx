// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ element, requiredRole }) => {

//   const authData = sessionStorage.getItem("authToken");
  
//   // Parse the stored JSON string
//   const user = authData ? JSON.parse(authData).users : null;

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

  
//   if (requiredRole && user.userRole !== requiredRole) {

//     return <Navigate to="/" replace />; 
//   }

//   return element;
// };

// export default ProtectedRoute;



import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, allowedRoles = [] }) => {
  const authData = sessionStorage.getItem("authToken");

  const user = authData ? JSON.parse(authData).users : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.userRole)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
