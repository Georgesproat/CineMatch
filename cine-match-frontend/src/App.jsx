import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import lightTheme from "./theme/lightTheme";
import darkTheme from "./theme/darkTheme";

function App({ isAuthenticated }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
      <AppRoutes isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
}

export default App;
