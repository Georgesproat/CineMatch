import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import muiTheme from "./theme/muiTheme";
import { AuthProvider } from "./context/AuthContext";

function App({ isAuthenticated }) {
  const [theme, setTheme] = useState(muiTheme);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <AppRoutes isAuthenticated={isAuthenticated} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
