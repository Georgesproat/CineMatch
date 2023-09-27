import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  styled,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
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

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      // Construct the user registration data
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };

      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        // Registration was successful
        console.log("Registration successful!");
        // You can redirect to the login page or perform any other action
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
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
                padding: "50px"
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <StyledForm onSubmit={handleRegistration}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </Grid>
                <StyledButton type="submit" fullWidth variant="contained">
                  Sign Up
                </StyledButton>
                <Grid container justifyContent="center">
                  <Grid item>
                    <RouterLink to="/login" variant="body2">
                      Already have an account? Sign in
                    </RouterLink>
                  </Grid>
                </Grid>
              </StyledForm>
            </Box>
          </Grid>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default RegisterForm;
