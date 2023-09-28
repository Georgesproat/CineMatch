import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ redirectPath = "/login" }) {
  const isAuthenticated = localStorage.getItem("jwtToken");

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  } else {
    
    return null;
  }
}

export default ProtectedRoute;
