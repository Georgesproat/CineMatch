import React, { useEffect, useState } from "react";
import Axios from "axios";
import MovieCard from "../components/MovieCard/MovieCard";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Axios.get("/api/movies") // Replace with your API endpoint
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);
  return (
    <div>
      <MovieCard/>
    </div>
  );
};

export default Movies;
