import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("jwtToken") !== null;

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
