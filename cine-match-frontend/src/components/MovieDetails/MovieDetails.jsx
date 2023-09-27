import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Chip,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import StarRating from "../StarRating/StarRating";

const MovieDetails = ({ open, onClose, movie }) => {
  const [userRatings, setUserRatings] = useState({
    storytelling: 0,
    visuals: 0,
    productionValue: 0,
    performance: 0
  });

  const handleRatingChange = (category, newValue) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [category]: newValue
    }));
  };

  if (!movie) {
    return null;
  }

  const submitRatings = () => {
    // Fetch user ID from your JWT token (assuming it's stored in a cookie or local storage)
    const token = localStorage.getItem("your_jwt_token"); // Replace with the actual name of your JWT token
    let userId = null;

    if (token) {
      try {
        // Decode the JWT token to get user information
        const decodedToken = jwt_decode(token); // You'll need to import the jwt_decode library
        userId = decodedToken.userId; // Replace 'userId' with the key that holds the user ID in your JWT payload
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }

    if (!userId) {
      console.error("User ID not found in JWT token");
      return;
    }

    // Make a POST request to your backend API to submit ratings
    const requestBody = {
      movieId: movie.id,
      userRatings,
      userId // Add user ID to the request body
    };

    fetch("http://localhost:3000/api/ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or show a confirmation message
        console.log("Ratings submitted successfully:", data);
      })
      .catch((error) => {
        console.error("Error submitting ratings:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>{movie.title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                src={movie.posterImageUrl}
                alt={movie.title}
                height="100%"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="body1">{movie.description}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
              Release Year: {movie.releaseYear}
            </Typography>
            <Chip label={`Rating: ${movie.averageRating}`} color="primary" />
            <Divider sx={{ my: 2 }} />
            <StarRating
              label="Storytelling"
              initialValue={userRatings.storytelling}
              onChange={(newValue) =>
                handleRatingChange("storytelling", newValue)
              }
            />
            <StarRating
              label="Visuals"
              initialValue={userRatings.visuals}
              onChange={(newValue) => handleRatingChange("visuals", newValue)}
            />
            <StarRating
              label="Production Value"
              initialValue={userRatings.productionValue}
              onChange={(newValue) =>
                handleRatingChange("productionValue", newValue)
              }
            />
            <StarRating
              label="Performance"
              initialValue={userRatings.performance}
              onChange={(newValue) =>
                handleRatingChange("performance", newValue)
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieDetails;
