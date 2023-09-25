import React from "react";
import { useAuth } from "../authContext";
import { Redirect } from "react-router-dom";

function Discover() {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Redirect to="/login" />;
  }
  return (
    <div className="discover">
      <h2>Discover Movies</h2>
    </div>
  );
}

export default Discover;
