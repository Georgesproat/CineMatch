import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Tabs, Tab, Switch } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const tabValue = (pathname) => {
    switch (pathname) {
      case "/":
        return 0;
      case "/discover":
        return 1;
      // Add more cases for other sections as needed
      default:
        return false;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">CineMatch</Typography>
        <div style={{ flexGrow: 1 }} />
        <Tabs value={tabValue(location.pathname)} aria-label="navigation tabs">
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Discover" component={Link} to="/discover" />
          {/* Add more tabs for other sections as needed */}
        </Tabs>
        <Switch
          color="default"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
