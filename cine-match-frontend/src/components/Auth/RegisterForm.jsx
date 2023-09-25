import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
  makeStyles
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

function RegisterForm() {
  const classes = useStyles();
  const theme = useTheme();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Registration was successful
        console.log("Registration successful!");
        // Redirect to login page or perform any other action
      } else {
        // Handle registration error
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h4" component="h2">
        Registration
      </Typography>
      <form className={classes.form}>
        <TextField
          margin="normal"
          fullWidth
          variant="outlined"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
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
          onClick={handleRegistration}
          className={classes.button}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}

export default RegisterForm;
