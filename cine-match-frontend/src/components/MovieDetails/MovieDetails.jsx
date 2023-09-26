import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Divider,
  Chip,
  Grid,
  Paper,
  Link
} from "@mui/material";

const MovieDetails = ({ movieId }) => {
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
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Movie Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Card sx={{ mt: 4 }}>
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%"
          }}
          image={movie.backdropImageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography sx={{ mb: 2 }} color="text.secondary">
            {movie.releaseYear}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="text.secondary">
            {movie.description}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Chip label={`Rating: ${movie.averageRating}`} color="primary" />
          <Button size="small" color="primary">
            View Trailer
          </Button>
        </CardActions>
      </Card>
      <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Cast & Crew
        </Typography>
        <Grid container spacing={2}>
          {movie.credits.map((credit) => (
            <Grid item xs={6} sm={4} md={3} key={credit.crewMember.id}>
              <Link href={`/cast/${credit.crewMember.id}`}>
                {credit.crewMember.name}
              </Link>
              <Typography variant="caption" color="text.secondary">
                {credit.role}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default MovieDetails;
