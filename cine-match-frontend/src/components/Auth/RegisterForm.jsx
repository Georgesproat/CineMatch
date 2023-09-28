import React, { useState } from "react";
import AuthForm from "./AuthForm";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

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
