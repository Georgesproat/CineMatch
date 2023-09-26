import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  CardActions,
  Chip,
  Divider
} from "@mui/material";

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
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: "56.25%"
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
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Chip label={`Rating: ${movie.averageRating}`} color="primary" />
        <Button size="small" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
