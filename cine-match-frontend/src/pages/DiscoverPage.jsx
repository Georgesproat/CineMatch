import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function Discover() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    navigate("/login");
    // Return null or a loading indicator while navigating
    return null;
  }

  return (
    <div className="discover">
      <h2>Discover Movies</h2>
      {/* Add content for discovering movies */}
    </div>
  );
}

export default Discover;
