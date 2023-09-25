import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import Discover from "../pages/DiscoverPage";
import NotFound from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/discover" component={Discover} />
      <Route component={NotFound} />
    </Routes>
  );
}

export default AppRoutes;
