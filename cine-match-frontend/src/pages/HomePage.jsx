import React from "react";
import MovieRecommendations from "../components/MovieRecommendations/MovieRecommendations";
import { Typography, Container, Button } from "@mui/material";

const Home = () => {
  const handleRefreshClick = () => {
    window.location.reload();
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{ marginTop: "2rem", marginBottom: "1rem" }}
      >
        Welcome to CineMatch
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "1rem" }}>
        This is where you'll find personalized movie recommendations based on
        your preferences. To discover new movies and create your imprrove your list,
        head over to the <strong>Discover</strong> page in the navigation bar.
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={handleRefreshClick}
        style={{ color: "#FFA400", borderColor: "#FFA400" }}
      >
        Refresh
      </Button>
      <MovieRecommendations />
    </Container>
  );
};

export default Home;
