import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/Navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import muiTheme from "./theme/muiTheme";

function App({ isAuthenticated }) {
  const [theme, setTheme] = useState(muiTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <AppRoutes isAuthenticated={isAuthenticated} />
    </ThemeProvider>
  );
}

export default App;
