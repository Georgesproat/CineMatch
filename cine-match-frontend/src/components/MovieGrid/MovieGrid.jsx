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
import SearchBar from "../SearchBar/SearchBar";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../../theme/muiTheme";

const MovieGrid = () => {
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
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

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm); 
    fetch(`http://localhost:3000/api/movies/search?term=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((error) => {
        console.error("Error performing search:", error);
      });
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="lg" sx={{ mx: "auto" }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mt: 0, paddingTop: "25px", color: "#FFA400" }}
        >
          Discover Movies
        </Typography>
        <Divider sx={{ my: 1 }} />
        <SearchBar onSearch={handleSearch} />
        <Grid container spacing={2} sx={{ padding: "20px 0" }}>
          {(searchQuery && searchResults.length > 0
            ? searchResults
            : movies
          ).map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard movie={movie} />
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
    </ThemeProvider>
  );

};

export default MovieGrid;
