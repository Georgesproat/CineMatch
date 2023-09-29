import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "..//../context/AuthContext";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const { login } = useAuth(); // Get the login function from useAuth

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

      const success = await login(userData); // Call the login function

      if (success) {
        // Registration was successful
        console.log("Registration successful!");
        // You can redirect to the login page or perform any other action
      } else {
        // Handle registration error
        setError("Registration failed. Please check your data.");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <AuthForm
      formTitle="Sign up"
      onSubmit={handleRegistration} // Fixed the function name here
      buttonText="Sign Up"
      error={error}
    />
  );
}

export default RegisterForm;
