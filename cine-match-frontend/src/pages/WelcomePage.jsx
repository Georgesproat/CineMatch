import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  Grid
} from "@mui/material";
import { muiTheme } from "../theme/muiTheme";

function WelcomePage() {
  const containerStyle = {
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "#050517",
    color: "#E5E5E5",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#FFA400",
    marginBottom: "1rem"
  };

  const introTextStyle = {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#FFA400",
    maxWidth: "800px"
  };

  const buttonGroupStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem"
  };

  const gridContainerStyle = {
    maxWidth: "800px"
   
  };

  const gridItemStyle = {
    fontSize: "1 rem",
    backgroundColor: "#050517",
    
    color: "#E5E5E5",
    borderRadius: "8px",
    padding: "1rem",
    minHeight: "200px"
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper elevation={3} style={containerStyle}>
        <Typography style={titleStyle}>Welcome to CineMatch!</Typography>
        <Typography style={introTextStyle}>
          CineMatch is your ultimate platform for discovering and rating movies.
          When you rate a movie on CineMatch, you have the opportunity to
          evaluate it in four key aspects:
        </Typography>
        <Grid container spacing={2} style={gridContainerStyle}>
          {/* Sections 1 and 2 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={gridItemStyle}>
               Storytelling Rating:
              <br />
              Assess the quality of the movie's plot, writing, and direction.
              Your storytelling rating helps us understand your preferences in
              captivating narratives.
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={gridItemStyle}>
               Visuals Rating:
              <br />
              Evaluate the cinematography, camera work, lighting, and visual
              effects. Your visuals rating guides us in recommending movies with
              stunning visual experiences.
            </Paper>
          </Grid>
          {/* Sections 3 and 4 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={gridItemStyle}>
               Production Value Rating:
              <br />
              Rate aspects like art direction, costume, makeup, and visual
              effects that contribute to a film's production quality. 
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={gridItemStyle}>
               Performance Rating:
              <br />
              Judge the acting performances in the film. Your performance rating
              aids us in recommending movies with outstanding acting.
              <br />
              <br />
              <br />
            </Paper>
          </Grid>
        </Grid>
        <div style={buttonGroupStyle}>
          <Link
            to="/login"
            style={{ textDecoration: "none", marginRight: "1rem" }}
          >
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
      </Paper>
    </ThemeProvider>
  );
}

export default WelcomePage;
