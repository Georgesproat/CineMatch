import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Paper,
  ThemeProvider
} from "@mui/material";
import { muiTheme } from "../theme/muiTheme"; 

function WelcomePage() {
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "1rem",
    backgroundColor: "#050517", // Background color
    color: "#E5E5E5" // Text color
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#FFA400" // Header color
  };

  const descriptionStyle = {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    textAlign: "center"
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem"
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper elevation={3} style={containerStyle}>
        <Container maxWidth="sm">
          <Typography style={titleStyle}>Welcome to CineMatch!</Typography>
          <Typography style={descriptionStyle}>
            CineMatch is your ultimate platform for discovering and rating
            movies. Join our passionate community of movie enthusiasts to
            explore, rate, and discuss your favorite films.
          </Typography>
          <div style={buttonGroupStyle}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ color: "#FFA400", borderColor: "#FFA400" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                style={{ color: "#FFA400", borderColor: "#FFA400" }}
              >
                Register
              </Button>
            </Link>
          </div>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

export default WelcomePage;
