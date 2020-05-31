import React from "react";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import theme from "./theme";
import Routes from "./routes";
import "./assets/stylesheets/app.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ColorModeProvider>
        <Routes />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
