import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";

const cardStyle = {
  marginBottom: "16px",
  display: "flex",
  flexDirection: "column",
  height: "100%"
};

const titleStyle = {
  marginBottom: "8px",
  fontSize: "1.25rem"
};

const genreStyle = {
  fontStyle: "italic",
  color: "rgba(0, 0, 0, 0.54)",
  marginBottom: "8px"
};

const descriptionStyle = {
  marginBottom: "8px"
};

const backdropImageStyle = {
  width: "100%",
  height: "auto",
  maxHeight: "300px",
  objectFit: "cover"
};

const MovieCard = ({ movieId }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // Make an API request to fetch movie data by movieId
    fetch(`/api/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data); // Assuming the API returns a movie object
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [movieId]);

  if (!movie) {
    return null; // You can render a loading indicator here
  }

  return (
    <Card style={cardStyle}>
      <img
        src={movie.backdropImageUrl}
        alt={movie.title}
        style={backdropImageStyle}
      />
      <CardContent>
        <Typography variant="h5" style={titleStyle}>
          {movie.title}
        </Typography>
        <Typography style={genreStyle}>{movie.genre.join(", ")}</Typography>
        <Typography style={descriptionStyle}>{movie.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
