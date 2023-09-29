import React, { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode"; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();

        // Decode the JWT token to extract user data, including user ID
        const decodedToken = jwtDecode(data.token);
        const userId = decodedToken.userId;

        // Store the JWT token in local storage
        localStorage.setItem("token", data.token);

        // Store the user data (including user ID) in the authentication context
        setUser({ ...data, userId });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };


  const logout = () => {
    
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
