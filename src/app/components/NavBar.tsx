import React from "react";
import { Link as ReachLink, useLocation } from "@reach/router";
import { Stack, Image, Text, Box, Button } from "@chakra-ui/core";
import Logo from "app/assets/img/logo.svg";

interface Props {
  isElevated?: boolean;
}

const NavBar: React.FC<Props> = (props) => {
  const location = useLocation();

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
                Peeerpay
              </Text>
            </Stack>
          </ReachLink>

          {location.pathname !== "/buy" && (
            <ReachLink to="/buy" style={{ zIndex: 10 }}>
              <Button variantColor="green" rightIcon="arrow-forward">
                Pay
              </Button>
            </ReachLink>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default NavBar;
