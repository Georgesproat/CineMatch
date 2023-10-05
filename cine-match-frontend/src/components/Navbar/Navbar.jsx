import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-color.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../../theme/muiTheme";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar
        position="static"
        color="primary"
        sx={{
          borderBottom: "2px solid #A30015",
          justifyContent: "space-between"
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              "@media (max-width: 768px)": {
                display: "none"
              }
            }}
          >
            <Tab
              label="Welcome"
              component={Link}
              to="/"
              sx={{
                fontWeight: "bold",
                color: "#A30015",
                fontSize: "1.1rem",
                marginRight: "1rem",
                textTransform: "none" 
              }}
            />
            <Tab
              label="Home"
              component={Link}
              to="/home"
              sx={{
                fontWeight: "bold",
                color: "#A30015",
                fontSize: "1.1rem",
                marginRight: "1rem",
                textTransform: "none"
              }}
            />
            <Tab
              label="Discover"
              component={Link}
              to="/discover"
              sx={{
                fontWeight: "bold",
                color: "#A30015",
                fontSize: "1.1rem",
                marginRight: "1rem",
                textTransform: "none" 
              }}
            />
            <IconButton
              edge="end"
              color="inherit"
              aria-label="profile"
              onClick={toggleProfileMenu}
              sx={{ fontSize: "1rem", marginRight: "2rem" }}
            >
              <AccountCircleIcon />
            </IconButton>
          </Box>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              display: { md: "none" },
              fontSize: "2rem",
              marginRight: "1rem"
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {profileMenuOpen && (
        <ProfileMenu
          isOpen={profileMenuOpen}
          onRequestClose={toggleProfileMenu}
        />
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            backgroundColor: "#050517", 
            color: "#A30015" 
          }
        }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Welcome" />
          </ListItem>
          <ListItem button component={Link} to="/home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/discover">
            <ListItemText primary="Discover" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={toggleProfileMenu}>
            <ListItemText primary="Profile" />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
