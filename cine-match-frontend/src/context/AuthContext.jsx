import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

const [user, setUser] = useState({ token, userId });

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

        // Store the JWT token in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        // Store the entire data object in the authentication context
        setUser(data);

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
    localStorage.removeItem("userId");
    setUser({ token: null, userId: null });
  };

  const register = async (userData) => {
    try {
      console.log(JSON.stringify(userData));
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();

       
        localStorage.setItem("token", data.token);
        

        
        setUser(data);

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
