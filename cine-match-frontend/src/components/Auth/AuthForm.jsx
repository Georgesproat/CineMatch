import React, { useState } from "react";
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
import { ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/logo-color.png";
import { customColors, muiTheme } from "../../theme/muiTheme";

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  "& input::placeholder": {
    color: customColors.lapisLazuli
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  backgroundColor: customColors.orangeWeb,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: customColors.lapisLazuli
  }
}));

const StyledImage = styled("img")(({ theme }) => ({
  maxWidth: "100%"
}));

function AuthForm({ formTitle, onSubmit, buttonText, error }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <StyledContainer component="main" maxWidth="md">
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
                {formTitle}
              </Typography>
              <StyledForm onSubmit={onSubmit}>
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
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
                      InputLabelProps={{
                        style: { color: customColors.lapisLazuli }
                      }}
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
                      InputLabelProps={{
                        style: { color: customColors.lapisLazuli }
                      }}
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
                      InputLabelProps={{
                        style: { color: customColors.lapisLazuli }
                      }}
                    />
                  </Grid>
                </Grid>
                <StyledButton type="submit" fullWidth variant="contained">
                  {buttonText}
                </StyledButton>
              </StyledForm>
            </Box>
          </Grid>
        </Grid>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default AuthForm;
