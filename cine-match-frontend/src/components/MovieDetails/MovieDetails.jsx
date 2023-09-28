import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  ThemeProvider
} from "@mui/material";
import StarRating from "../StarRating/StarRating";
import { muiTheme } from "../../theme/muiTheme";

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
      movieId: movie._id, // Assuming 'movieId' is the correct property
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
    <ThemeProvider theme={muiTheme}>
      <Dialog open={open} onClose={onClose} maxWidth="md">
        <DialogTitle
          sx={{
            backgroundColor: "#050517",
            color: "#FFA400"
          }}
        >
          {movie.title}
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: "#050517",
            color: "#E5E5E5"
          }}
        >
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
              <Typography variant="body1" sx={{ color: "#E5E5E5" }}>
                {movie.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ color: "#E5E5E5" }}>
                Release Year: {movie.releaseYear}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <StarRating
                label="Storytelling"
                initialValue={userRatings.storytelling}
                onChange={(newValue) =>
                  handleRatingChange("storytelling", newValue)
                }
              />
              <StarRating
                label="Performance"
                initialValue={userRatings.performance}
                onChange={(newValue) =>
                  handleRatingChange("performance", newValue)
                }
              />
              <StarRating
                label="Production Value"
                initialValue={userRatings.productionValue}
                onChange={(newValue) =>
                  handleRatingChange("productionValue", newValue)
                }
              />
              <StarRating
                label="Visuals"
                initialValue={userRatings.visuals}
                onChange={(newValue) => handleRatingChange("visuals", newValue)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: "#050517",
            color: "#E5E5E5"
          }}
        >
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          <Button onClick={submitRatings} color="primary">
            Submit Ratings
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default MovieDetails;
