import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

function WelcomePage() {
  return (
    <Container>
      <Typography variant="h1">Welcome to CineMatch!</Typography>
      <Typography variant="body1">
        CineMatch is a platform to discover and rate movies. Join our community
        of movie enthusiasts!
      </Typography>
      <Link to="/login">
        <Button variant="contained">Login</Button>
      </Link>
      <Link to="/register">
        <Button variant="contained">Register</Button>
      </Link>
    </Container>
  );
}

export default WelcomePage;
