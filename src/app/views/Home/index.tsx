import React from "react";
import { RouteComponentProps } from "@reach/router";
import { Box } from "@chakra-ui/core";
import NavBar from "app/components/NavBar";
import Footer from "app/components/Footer";
import Hero from "app/views/Home/components/Hero";
import Features from "app/views/Home/components/Features";

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = (props) => {
  return (
    <Box paddingTop={5} display="flex" flexDirection="column" minHeight="100vh">
      <NavBar />
      <Hero />
      <Features />
      <Footer />
    </Box>
  );
};

export default Home;
