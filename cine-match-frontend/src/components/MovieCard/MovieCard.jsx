import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import MovieDetails from "../MovieDetails/MovieDetails";
import { muiTheme } from "../../theme/muiTheme";

const MovieCard = ({ movie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#050517"
        }}
      >
        <CardActionArea onClick={handleDialogOpen}>
          <CardMedia
            component="div"
            sx={{
              height: "40vh"
            }}
            image={movie.backdropImageUrl}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              sx={{
                color: "#FFA400" 
              }}
            >
              {movie.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                color: "#E5E5E5" 
              }}
            >
              {movie.releaseYear}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <MovieDetails
        open={dialogOpen}
        onClose={handleDialogClose}
        movie={movie}
      />
    </ThemeProvider>
  );
};

export default MovieCard;
