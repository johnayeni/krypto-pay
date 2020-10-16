import React from "react";
import { Router, Redirect } from "@reach/router";
import Home from "./views/Home";
import Buy from "./views/Buy";

const Routes: React.FC = () => {
  return (
    <Router>
      <Home path="/" />
      <Buy
        // @ts-ignore
        path="/buy"
      />
      <Redirect from="*" to="/" />
    </Router>
  );
};

export default Routes;
