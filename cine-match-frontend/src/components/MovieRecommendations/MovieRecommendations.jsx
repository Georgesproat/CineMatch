import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { useAuth } from "../../context/authContext";
import { Container, Grid, Typography, Divider } from "@mui/material";

const MovieRecommendations = () => {
  const { user } = useAuth();
  const userId = user.userId;
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/recommendedMovies?userId=${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setRecommendedMovies(data);

          // Fetch movie details and convert ObjectIds to movieIds
          const movieData = await Promise.all(
            data.map(async (objectId) => {
              try {
                const movieResponse = await fetch(
                  `http://localhost:3000/api/movies/${objectId}`
                );

                if (movieResponse.ok) {
                  const movie = await movieResponse.json();
                  return movie; // Use the whole movie data
                } else {
                  console.error(
                    "Error fetching movie details:",
                    movieResponse.statusText
                  );
                  return null;
                }
              } catch (error) {
                console.error("Error fetching movie details:", error);
                return null;
              }
            })
          );

          // Filter out null values (error cases) before setting the state
          const filteredMovieData = movieData.filter((movie) => movie !== null);

          setMovies(filteredMovieData);
        } else {
          console.error(
            "Error fetching recommended movies:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, [userId]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h2"
        sx={{ mt: 0, paddingTop: "25px", color: "#FFA400" }}
      >
        Recommended Movies
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Grid container spacing={2} sx={{ padding: "20px 0" }}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieRecommendations;
