import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "..//../context/authContext";
import axiosInstance from "..//../axiosConfig";


import {
  Container,
  styled,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  CssBaseline
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "..//../assets/logo-color.png";

const defaultTheme = createTheme();

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh"
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

const StyledImage = styled("img")(({ theme }) => ({
  maxWidth: "100%"
}));

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Construct the login data
      const loginData = {
        email: event.target.email.value,
        password: event.target.password.value
      };

      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        // Login was successful
        console.log("Login successful!");
        const userData = await response.json();
        const token = userData.token;
        localStorage.setItem("jwtToken", token);

        // Use the axiosInstance for authenticated requests
        axiosInstance
          .get("/api/user/login")
          .then((response) => {
            // Handle the response here
            console.log("Authenticated request response:", response.data);

            // Update the user's authentication state
            login(userData);

            // Navigate to the "/home" route
            navigate("/home");
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error making authenticated request:", error);
          });
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledContainer component="main" maxWidth="md">
        <CssBaseline />
        <Grid container spacing={2}>
          {/* Left side: Image */}
          <Grid item xs={12} sm={6}>
            <StyledImage src={logo} alt="Logo" />
          </Grid>
          {/* Right side: Form */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <StyledForm onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Sign In
                </StyledButton>
                <RouterLink to="/register" variant="body2">
                  Don't have an account? Sign up
                </RouterLink>
              </StyledForm>
            </Box>
          </Grid>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default LoginForm;
