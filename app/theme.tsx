// app/theme.ts
"use client";
import { createTheme } from "@mui/material/styles";

// Define your custom MUI theme
const theme = createTheme({
  palette: {
    mode: "light", // can be "dark"
    primary: {
      main: "#2563eb", // Tailwind blue-600
    },
    secondary: {
      main: "#9333ea", // Tailwind purple-600
    },
    background: {
      default: "#f9fafb", // light gray background
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
