import React from "react";
import { Router } from "@reach/router";
import Home from "./views/Home";
import Buy from "./views/Buy";

const Routes: React.FC = () => {
  return (
    <Router>
      <Home path="/" />
      <Buy path="/buy" />
    </Router>
  );
};

export default Routes;
