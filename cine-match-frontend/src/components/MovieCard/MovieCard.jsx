import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Chip,
  Divider,
  Button,
  CardActionArea // Import CardActionArea
} from "@mui/material";
import MovieDetails from "../MovieDetails/MovieDetails";

const MovieCard = ({ movieId }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State for the dialog
  const [userRating, setUserRating] = useState(0); // State for user's rating

  useEffect(() => {
    // Make an API request to fetch movie data by movieId
    fetch(`http://localhost:3000/api/movies/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setLoading(false); // Data has been loaded
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
        setError(error);
        setLoading(false); // An error occurred
      });
  }, [movieId]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  if (loading) {
    // Render loading indicator or message here
    return <div>Loading...</div>;
  }

  if (error) {
    // Render an error message here if needed
    return <div>Error loading movie data: {error.message}</div>;
  }

  if (!movie) {
    // Render a message if movie data is not available
    return <div>Movie data not found.</div>;
  }

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Wrap the entire card content in CardActionArea */}
      <CardActionArea onClick={handleDialogOpen}>
        <CardMedia
          component="div"
          sx={{
            // Adjust the height to your desired size (e.g., "40vh")
            height: "40vh"
          }}
          image={movie.backdropImageUrl}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
          <Typography sx={{ mb: 2 }} color="text.secondary">
            {movie.releaseYear}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </CardContent>
      </CardActionArea>
      <Divider />

      {/* Render the MovieDetails dialog */}
      <MovieDetails
        open={dialogOpen}
        onClose={handleDialogClose}
        movie={movie}
        userRating={userRating} // Pass user's rating to MovieDetails
      />
    </Card>
  );
};

export default MovieCard;
