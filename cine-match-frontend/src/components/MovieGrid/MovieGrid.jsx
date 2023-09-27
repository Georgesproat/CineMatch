import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Button,
  Box
} from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 20;

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    fetch(
      `http://localhost:3000/api/movies?page=${page}&limit=${moviesPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies);
        setTotalMovies(data.totalMovies);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="lg" sx={{ mx: "auto" }}>
      {" "}
      {/* Adjusted maxWidth and added mx */}
      <Typography variant="h4" component="h2" sx={{ mt: 4 }}>
        Movie Grid
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movieId={movie._id} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous Page
        </Button>
        <Button
          disabled={currentPage * moviesPerPage >= totalMovies}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </Button>
      </Box>
    </Container>
  );
};

export default MovieGrid;
