import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import MovieGrid from "../components/MovieGrid/MovieGrid"; 

function Discover() {
  // const { user } = useAuth();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the user is not authenticated and redirect to the login page
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);

  return (
    <div>
      <h2>Discover Movies</h2>
      <MovieGrid page={1} moviesPerPage={20} />
    </div>
  );
}

export default Discover;
