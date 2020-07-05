import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Box } from "@chakra-ui/core";
import NavBar from "app/components/NavBar";
import Hero from "app/views/Home/components/Hero";
import Features from "app/views/Home/components/Features";

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = (props) => {
  return (
    <Box paddingTop={5}>
      <NavBar />
      <Hero />
      <Features />
    </Box>
  );
};

export default Home;
