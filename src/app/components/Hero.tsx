import React from "react";
import { Link as ReachLink } from "@reach/router";
import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  Stack,
  Avatar,
} from "@chakra-ui/core";
import { ReactComponent as BitcoinIllustration } from "app/assets/img/bitcoin-illustration.svg";
import Bitcoin from "app/assets/img/icons/bitcoin-logo.svg";
import Ethereum from "app/assets/img/icons/ethereum-logo.svg";

interface Props {}

const Hero: React.FC<Props> = (props) => {
  return (
    <Box paddingX={[5, 10, "15vw"]} paddingTop={[50, 50, 0]}>
      <Grid
        templateColumns={["1fr", "1fr", "repeat(2, 1fr)"]}
        gap={20}
        alignItems="center"
      >
        <Stack spacing={10}>
          <Heading>Pay with crypto</Heading>
          <Text fontWeight="600" color="grey" fontSize="2xl">
            Pay Utility Bills or purchase Mobile Refills in Africa quickly,
            safely, and privately with Bitcoin and other cryptocurrencies.
          </Text>
          <Stack>
            <ReachLink to="/buy">
              <Button size="lg" variantColor="green" isFullWidth>
                Get Started
              </Button>
            </ReachLink>
            <Text marginTop={10}>Supported payment methods</Text>
            <Stack isInline>
              <Avatar
                size="md"
                src={Bitcoin}
                name="bitcoin"
                style={{ background: "none" }}
              />
              <Avatar
                size="md"
                src={Ethereum}
                name="ethereum"
                style={{ background: "none" }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Box display={["none", "none", "block"]}>
          <BitcoinIllustration />
        </Box>
      </Grid>
    </Box>
  );
};

export default Hero;
