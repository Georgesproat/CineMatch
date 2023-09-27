import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Chip
} from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";

const MovieGrid = ({ page, moviesPerPage }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch the list of movies from your backend based on the current page
    fetch(`/api/movies?page=${page}&limit=${moviesPerPage}`, {
      headers: {
        // Include the Origin header with frontend's domain
        Origin: " http://localhost:5173/"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); 
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [page, moviesPerPage]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
        Movie Grid
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieGrid;
