import React from "react";
import { AppBar, Tab, Tabs, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

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
        <Tabs value={tabValue(location.pathname)} aria-label="navigation tabs">
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Discover" component={Link} to="/discover" />
          {/* Add more tabs for other sections as needed */}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
