import React, { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "..//../context/authContext";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.password.value
      };

      console.log("User Data:", userData);
      const success = await register(userData);

      if (success) {
        // Registration was successful
        setSuccessMessage("Registration successful. You can now log in.");
        // Redirect to the login page
        navigate("/login");
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
    <div>
      <AuthForm
        formTitle="Sign up"
        onSubmit={handleRegistration}
        buttonText="Sign Up"
        error={error}
        successMessage={successMessage}
      />
    </div>
  );
}

export default RegisterForm;
