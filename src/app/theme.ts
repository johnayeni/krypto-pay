import { theme } from "@chakra-ui/core";

export default {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#5B99F0",
    },
    lightGrey: {
      800: "#F0F2F5",
      700: "#F9FAFB",
    },
  },
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: '"SQ market", sans-serif',
    body: "SQ market, sans-serif",
    mono: "SQ market, sans-serif",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  },
};
