// authContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (token) {
          const response = await fetch(
            "http://localhost:3000/api/user/profile",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.ok) {
            const userData = await response.json();
            handleLogin(userData);
          } else {
            // Handle invalid token or server errors
            console.error("Invalid token or server error");
            setLoading(false);
          }
        } else {
          // No token found
          setLoading(false);
        }
      } catch (error) {
        // Handle other errors
        console.error("Error checking authentication:", error);
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login: handleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
