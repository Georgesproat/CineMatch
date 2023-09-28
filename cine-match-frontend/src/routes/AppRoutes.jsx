import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Welcome from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import DiscoverPage from "../pages/DiscoverPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegistrationPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes({ isAuthenticated, ...props }) {

  return (
    <Routes>
      <Route path="/" element={<Welcome {...props} />} />
      <Route path="/home" element={<ProtectedRoute><HomePage {...props} /></ProtectedRoute>}/>
      {/* <Route path="/discover" element={<ProtectedRoute><DiscoverPage {...props} /></ProtectedRoute>}/> */}
      <Route path="/discover" element={<DiscoverPage {...props} />}/>
      <Route path="/login" element={<LoginPage {...props} />} />
      <Route path="/register" element={<RegisterPage {...props} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
