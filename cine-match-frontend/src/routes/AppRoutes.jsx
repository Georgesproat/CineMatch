import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import Discover from "../pages/DiscoverPage";
import Login from "../pages/LoginPage"
import Register from '../pages/RegistrationPage'
import NotFound from "../pages/NotFoundPage";

function AppRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/discover" element={<Discover {...props} />} />
      <Route path="/login" element={<Login {...props} />} />
      <Route path="/register" element={<Register {...props} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
