import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
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

  const { user } = useAuth();

  const handleRatingChange = (category, newValue) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [category]: newValue
    }));
  };

  // Fetch the user's previous ratings when the component mounts
  useEffect(() => {
    if (user && user.userId && movie) {
      fetchUserRatings(movie._id, user.userId);
    }
  }, [user, movie]);

  const fetchUserRatings = async (movieId, userId) => {
    try {
      // Make an API request to fetch user ratings for this movie
      const response = await fetch(
        `http://localhost:3000/api/ratings/${movieId}/user/${userId}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user ratings:", data.ratings);
        // Convert fetched ratings to numbers if needed
        setUserRatings({
          storytelling: Number(data.ratings.storytellingRating),
          visuals: Number(data.ratings.visualsRating),
          productionValue: Number(data.ratings.productionValueRating),
          performance: Number(data.ratings.performanceRating)
        });
      } else if (response.status === 404) {
        // Handle the case where no ratings exist for this movie
        console.log("No ratings found for this movie.");
        // You can choose to set default ratings or leave them as they are
        // setUserRatings({ storytelling: 0, visuals: 0, productionValue: 0, performance: 0 });
      } else {
        console.error("Error fetching user ratings:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user ratings:", error);
    }
  };


  const submitRatings = async () => {
    if (user && user.userId) {
      // Construct the request body in the required format
      const requestBody = {
        movieId: movie._id,
        userId: user.userId,
        userRatings: {
          storytelling: userRatings.storytelling,
          visuals: userRatings.visuals,
          productionValue: userRatings.productionValue,
          performance: userRatings.performance
        }
      };

      try {
        // Check if a rating already exists for the user and movie
        const checkResponse = await fetch(
          `http://localhost:3000/api/ratings/${movie._id}/user/${user.userId}`
        );

        if (checkResponse.ok) {
          // If a rating exists, update it using a PUT request
          const updateResponse = await fetch(
            `http://localhost:3000/api/ratings/${movie._id}/user/${user.userId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(requestBody)
            }
          );

          if (updateResponse.ok) {
            // Handle success or show a confirmation message
            console.log("Ratings updated successfully");
          } else {
            // Handle error response from the API
            const data = await updateResponse.json();
            console.error("Error updating ratings:", data.error);
          }
        } else {
          // If no rating exists, create a new rating using a POST request
          const createResponse = await fetch(
            "http://localhost:3000/api/ratings/submit",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(requestBody)
            }
          );

          if (createResponse.ok) {
            // Handle success or show a confirmation message
            console.log("Ratings submitted successfully");
          } else {
            // Handle error response from the API
            const data = await createResponse.json();
            console.error("Error submitting ratings:", data.error);
          }
        }
      
    // Close the dialog once ratings are submitted
      onClose();
    } catch (error) {
      console.error("Error submitting/updating ratings:", error);
    }
  } else {
    // Handle the case where the user is not authenticated
    console.error("User is not authenticated.");
  }
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
              {/* Editable Star Ratings */}
              <StarRating
                label="Storytelling"
                initialValue={userRatings.storytelling} // Set the value to user's rating
                onChange={(newValue) =>
                  handleRatingChange("storytelling", newValue)
                }
              />
              <StarRating
                label="Performance"
                initialValue={userRatings.performance} // Set the value to user's rating
                onChange={(newValue) =>
                  handleRatingChange("performance", newValue)
                }
              />
              <StarRating
                label="Production Value"
                initialValue={userRatings.productionValue} // Set the value to user's rating
                onChange={(newValue) =>
                  handleRatingChange("productionValue", newValue)
                }
              />
              <StarRating
                label="Visuals"
                initialValue={userRatings.visuals} // Set the value to user's rating
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
