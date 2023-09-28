import React, { useState } from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../../theme/muiTheme";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper
        component="form"
        onSubmit={handleSearch}
        sx={{
          p: "5px", // Adjust padding for the entire bar
          display: "flex",
          alignItems: "center",
          width: "50%", // Set width to 50% for half the page
          margin: "0", 
          border: "2px solid #145C9E", 
          borderRadius: "8px" 
        }}
      >
        <InputBase
          placeholder="Search for movies..."
          fullWidth
          value={searchTerm}
          onChange={handleInputChange}
          sx={{ color: "#145C9E" }} 
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </ThemeProvider>
  );
};

export default SearchBar;
