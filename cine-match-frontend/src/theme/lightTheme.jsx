import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#587291" // Dark blue
    },
    secondary: {
      main: "#A30015" // Red
    },
    background: {
      default: "#E5E5E5" // Light gray as background
    },
    text: {
      primary: "#050517" // Dark blue text
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
    // Add other typography settings here...
  }
  // Add other theme settings (spacing, breakpoints, etc.) here...
});

export default lightTheme;
