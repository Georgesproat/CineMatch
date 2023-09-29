import React, { createContext, useContext, useState } from "react";

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
       const user = await response.json();
       setUser(user);
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
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
