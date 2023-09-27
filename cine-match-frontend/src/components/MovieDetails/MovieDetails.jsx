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
