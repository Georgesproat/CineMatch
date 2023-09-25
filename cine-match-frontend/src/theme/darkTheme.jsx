import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#050517" // Dark blue
    },
    secondary: {
      main: "#FFA400" // Orange
    },
    background: {
      default: "#050517" // Dark blue as background
    },
    text: {
      primary: "#E5E5E5" // Light gray text
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
    // Add other typography settings here...
  }
  // Add other theme settings (spacing, breakpoints, etc.) here...
});

export default darkTheme;
