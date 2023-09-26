import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";

const MovieGrid = ({ page, moviesPerPage }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch the list of movies from your backend based on the current page
    fetch(`/api/movies?page=${page}&limit=${moviesPerPage}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); // Assuming the API returns an array of movies
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [page, moviesPerPage]);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
