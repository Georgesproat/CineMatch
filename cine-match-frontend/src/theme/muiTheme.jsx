import { createTheme } from "@mui/material/styles";

// Define your custom colors
export const customColors = {
  richBlack: "#050517ff",
  platinum: "#e5e5e5ff",
  orangeWeb: "#ffa400ff",
  lapisLazuli: "#145c9eff",
  carmine: "#a30015ff"
};

// Create a custom Material-UI theme
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: customColors.orangeWeb
    },
    secondary: {
      main: customColors.lapisLazuli
    },
    text: {
      primary: customColors.platinum
    },
    background: {
      default: customColors.richBlack
    }
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
  }
});

export default muiTheme;
