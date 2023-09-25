import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact component={Home} />
      <Route path="/movies" component={Movies} />
      <Route component={NotFound} />
    </Routes>
  );
}

export default AppRoutes;
