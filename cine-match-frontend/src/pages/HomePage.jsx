import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    navigate("/login");
    // Return null or a loading indicator while navigating
    return null;
  }

  return (
    <div>
      <h1>Welcome to CineMatch</h1>
      {/* Add content for your landing page */}
    </div>
  );
};

export default Home;
