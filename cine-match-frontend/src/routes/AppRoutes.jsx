import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Welcome from "../pages/WelcomePage";
import Home from "../pages/HomePage";
import Discover from "../pages/DiscoverPage";
import Login from "../pages/LoginPage";
import Register from "../pages/RegistrationPage";
import NotFound from "../pages/NotFoundPage";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function AppRoutes({ isAuthenticated, ...props }) {
  return (
    <Routes>
      <Route path="/" element={<Welcome {...props} />} />
      <Route
        path="/home"
        element={
          <PrivateRoute
            element={<Home {...props} />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route path="/discover" element={<Discover {...props} />} />
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/register" element={<Register {...props} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
