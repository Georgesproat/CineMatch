import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";
import AppRoutes from "./routes/AppRoutes";
import lightTheme from "./themes/lightTheme";
import darkTheme from "./themes/darkTheme";

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleTheme={toggleTheme} />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
