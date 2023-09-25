import React from "react";
import { useAuth } from "../authContext";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Welcome to CineMatch</h1>
      {/* Add content for your landing page */}
    </div>
  );
};

export default Home;
