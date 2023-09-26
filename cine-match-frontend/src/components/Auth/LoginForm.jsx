import React, { useState } from "react";
import { Container, styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; // Import TextField from @mui/material
import Button from "@mui/material/Button";

const StyledContainer = styled(Container)(({ theme }) => ({
  // Define your container styles here
}));

const StyledForm = styled("form")(({ theme }) => ({
  // Define your form styles here
}));

const StyledButton = styled(Button)(({ theme }) => ({
  // Define your button styles here
}));

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
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
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" component="h2">
        Login
      </Typography>
      <StyledForm>
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
        <StyledButton variant="contained" onClick={handleLogin}>
          Login
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}

export default LoginForm;
