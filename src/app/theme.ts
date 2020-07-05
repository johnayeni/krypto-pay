import { theme } from "@chakra-ui/core";

export default {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#01603A",
      800: "#009057",
      700: "#00EB8D",
    },
    green: {
      ...theme.colors.green,
      900: "#01603A",
      800: "#01603A",
      700: "#01603A",
      600: "#009057",
      500: "#009057",
      400: "#009057",
      300: "#00EB8D",
      200: "#00EB8D",
      100: "#00EB8D",
    },
    lightGrey: {
      800: "#F0F2F5",
      700: "#F9FAFB",
    },
  },
  breakpoints: ["30em", "48em", "62em", "80em"],
  fonts: {
    heading: "Quicksand, sans-serif",
    body: "Quicksand, sans-serif",
    mono: "Quicksand, sans-serif",
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
