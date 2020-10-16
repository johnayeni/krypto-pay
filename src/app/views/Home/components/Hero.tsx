import React from "react";
import { Link as ReachLink } from "@reach/router";
// @ts-ignore
import Lottie from "lottie-react";
import { Box, Grid, Heading, Text, Button, Stack, Avatar } from "@chakra-ui/core";
import Bitcoin from "app/assets/img/icons/bitcoin-logo.svg";
import Ethereum from "app/assets/img/icons/ethereum-logo.svg";
import PhoneAnimation from "app/assets/animations/phone-success.json";

const Hero: React.FC = () => {
  return (
    <Box paddingX={[5, 10, "15vw"]} paddingTop={[50, 50, 0]}>
      <Grid templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gap={20} alignItems="center">
        <Stack spacing={10}>
          <Heading>Pay with crypto</Heading>
          <Text fontWeight="600" color="grey" fontSize="2xl">
            Pay utility bills or purchase mobile top-ups quickly, safely, and privately using
            cryptocurrencies like Bitcoin.
          </Text>
          <Stack>
            <ReachLink to="/buy">
              <Button size="lg" variantColor="green" isFullWidth>
                Get Started
              </Button>
            </ReachLink>
            <Text marginTop={10}>Supported payment methods</Text>
            <Stack isInline>
              <Avatar size="md" src={Bitcoin} name="bitcoin" style={{ background: "none" }} />
              <Avatar size="md" src={Ethereum} name="ethereum" style={{ background: "none" }} />
            </Stack>
          </Stack>
        </Stack>
        <Box
          display={["none", "none", "flex"]}
          height={600}
          flexDirection="column"
          justifyContent="center"
        >
          <Lottie
            animationData={PhoneAnimation}
            loop={false}
            style={{
              height: 1000,
            }}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default Hero;
