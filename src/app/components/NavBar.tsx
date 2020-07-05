import React from "react";
import { Link as ReachLink } from "@reach/router";
import { Stack, Image, Text, Box, Button } from "@chakra-ui/core";
import Logo from "app/assets/img/logo.svg";

interface Props {
  isElevated?: boolean;
}

const NavBar: React.FC<Props> = (props) => {
  return (
    <>
      <Box
        paddingX={[5, 10, "15vw"]}
        paddingY={5}
        boxShadow={props.isElevated ? "0px 0px 8px rgba(0,0,0,.6)" : undefined}
      >
        <Stack justify="space-between" direction="row" alignItems="center">
          <ReachLink to="/">
            <Stack spacing={3} direction="row" alignItems="center">
              <Image src={Logo} alt="logo" size="50px" />
              <Text fontSize="2xl" fontWeight="bold">
                Krypto Pay
              </Text>
            </Stack>
          </ReachLink>

          <ReachLink to="/buy" style={{ zIndex: 10 }}>
            <Button variantColor="green" rightIcon="arrow-forward">
              Pay
            </Button>
          </ReachLink>
        </Stack>
      </Box>
    </>
  );
};

export default NavBar;
