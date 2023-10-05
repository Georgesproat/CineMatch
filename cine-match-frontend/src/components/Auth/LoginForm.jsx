import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useAuth } from "../../context/authContext";
import { Typography } from "@mui/material";

function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const loginData = {
        email: event.target.email.value,
        password: event.target.password.value
      };

      const success = await login(loginData);

      if (success) {
        // Login was successful
        console.log("Login successful!");
        navigate("/home");
      } else {
        // Handle login error
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  const registerLink = (
    <RouterLink to="/register" color="primary">
      Register here
    </RouterLink>
  );

  return (
    <div>
      <AuthForm
        formTitle="Sign in"
        onSubmit={handleSubmit}
        buttonText="Sign In"
        error={error}
        registerLink={
          <Typography variant="body2" color="#E5E5E5" align="center">
            Not signed up?{" "}
            <span
              style={{ color: "#E5E5E5", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </Typography>
        }
      />
    </div>
  );
}

export default LoginForm;
