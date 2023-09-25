import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div>
      <h1>Welcome to CineMatch!</h1>
      <p>
        CineMatch is a platform to discover and rate movies. Join our community
        of movie enthusiasts!
      </p>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
