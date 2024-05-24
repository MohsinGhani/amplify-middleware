// theme.ts
import { blue, grey, red, yellow } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Extend the ThemeOptions interface to include custom breakpoints
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    tv: true;
  }
}

// Extend the Palette interface to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    gradient: Palette["primary"];
    yellow: Palette["primary"];
    white: Palette["primary"];
    black: Palette["primary"];
  }
  interface PaletteOptions {
    gradient?: PaletteOptions["primary"];
    yellow?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
  }
}

// Initial theme options
const options: any = {
  palette: {
    primary: {
      main: blue["A700"],
      light: blue["A100"],
      dark: blue[900],
      contrastText: "#fbfdff",
    },
    secondary: {
      main: "#371ca2",
      light: "#734cf3",
      dark: "#140e45",
      contrastText: "#fbfdff",
    },
    gradient: {
      main: red[600],
    },
    yellow: {
      main: yellow["A700"],
      light: yellow[500],
      dark: yellow[700],
    },
    white: {
      main: grey[200],
      offwhite: "#eee9ff",
    },
    black: {
      main: grey[900],
      light: grey[700],
    },
  },
  breakpoints: {
    values: {
      mobile: 512,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
      tv: 1536,
    },
  },
};

// Create the theme instance with initial options
let theme = createTheme(options);

// Customize the theme further with responsive typography values
theme = createTheme(theme, {
  typography: {
    link: {
      fontSize: "0.8rem",
      [theme.breakpoints.up("md")]: {
        fontSize: "0.9rem",
      },
      fontWeight: 500,
      color: theme.palette.primary.main,
      display: "block",
      cursor: "pointer",
    },
    cardTitle: {
      fontSize: "1.2rem",
      display: "block",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
    },
    h7: {
      fontSize: "0.8rem",
    },
    h8: {
      fontSize: "0.7rem",
    },
  },
});

export default theme;
