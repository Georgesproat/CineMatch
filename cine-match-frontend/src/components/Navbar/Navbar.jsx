import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-color.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../../theme/muiTheme";

const Navbar = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar
        position="static"
        color="primary"
        sx={{
          borderBottom: "2px solid #A30015" 
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            component={Link}
            to="/"
            aria-label="logo"
            sx={{ borderRadius: "2%" }}
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "100px",
                height: "auto",
                borderRadius: "2%"
              }}
            />
          </IconButton>

          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#A30015"
            }}
          >
            CineMatch
          </Typography>
          <Tab
            label="Welcome"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              color: "#A30015"
            }}
          />
          <Tab
            label="Home"
            component={Link}
            to="/home"
            sx={{
              fontWeight: "bold",
              color: "#A30015"
            }}
          />
          <Tab
            label="Discover"
            component={Link}
            to="/discover"
            sx={{
              fontWeight: "bold",
              color: "#A30015"
            }}
          />
          <IconButton
            edge="end"
            color="inherit"
            component={Link}
            to="/profile"
            aria-label="profile"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
