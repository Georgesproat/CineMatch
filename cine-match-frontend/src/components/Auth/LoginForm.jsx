import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import AuthForm from "./AuthForm";


function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Construct the login data
      const loginData = {
        email: event.target.email.value,
        password: event.target.password.value
      };

      // Send the login request to your server
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

        // Navigate to the "/home" route
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

  return (
    <AuthForm
      formTitle="Sign in"
      onSubmit={handleSubmit}
      buttonText="Sign In"
      error={error}
    />
  );
}


export default LoginForm;
