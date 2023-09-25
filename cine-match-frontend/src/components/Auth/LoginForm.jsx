import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Full width
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function LoginForm() {
  const classes = useStyles();
  const theme = useTheme(); // Get the current theme

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Login was successful, handle as needed
        console.log("Login successful!");
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" component="h2">
        Login
      </Typography>
      <form className={classes.form}>
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color={theme.palette.primary.main} 
          onClick={handleLogin}
          className={classes.button}
        >
          Login
        </Button>
      </form>
    </Container>
  );
}

export default LoginForm;
