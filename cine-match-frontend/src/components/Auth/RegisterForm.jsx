import React, { useState } from "react";
import {
  Container,
  styled,
  TextField,
  Typography,
  Button
} from "@mui/material";

const StyledContainer = styled(Container)(({ theme }) => ({
  // Define your container styles here
}));

const StyledForm = styled("form")(({ theme }) => ({
  // Define your form styles here
}));

const StyledButton = styled(Button)(({ theme }) => ({
  // Define your button styles here
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
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" component="h2">
        Registration
      </Typography>
      <StyledForm>
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
        <StyledButton variant="contained" onClick={handleRegistration}>
          Register
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

export default RegisterForm;
