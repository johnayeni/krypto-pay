import React from "react";
import { Link as ReachLink } from "@reach/router";
import {
  Stack,
  Image,
  Text,
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import Logo from "app/assets/img/logo.svg";
import { FaBars } from "react-icons/fa";

interface Props {
  isElevated?: boolean;
}

const NavBar: React.FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        paddingX={[5, 10, "15vw"]}
        paddingY={5}
        boxShadow={props.isElevated ? "0px 0px 8px rgba(0,0,0,.6)" : undefined}
      >
        <Stack justify="space-between" direction="row">
          <ReachLink to="/">
            <Stack spacing={3} direction="row" alignItems="center">
              <Image src={Logo} alt="logo" size="30px" />
              <Text fontSize="2xl" fontWeight="bold">
                CoinRefill
              </Text>
            </Stack>
          </ReachLink>

          <Stack
            spacing={8}
            direction="row"
            alignItems="center"
            display={["none", "none", "initial"]}
          >
            <Link
              /* 
  // @ts-ignore */
              as={ReachLink}
              to="/buy?type=AIRTIME"
              color="grey"
              fontWeight="600"
            >
              Refill Phone
            </Link>
            {/* 
  // @ts-ignore */}
            <Link as={ReachLink} to="/buy">
              <Button variantColor="green" rightIcon="arrow-forward">
                Pay bill
              </Button>
            </Link>
          </Stack>

          <IconButton
            aria-label="Toggle side menu"
            size="lg"
            icon={FaBars}
            display={["initial", "initial", "none"]}
            onClick={onOpen}
          />
        </Stack>
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="white">
          <DrawerCloseButton />
          <Stack marginTop="10vh" alignItems="center" width="100%" paddingX={5}>
            <Link>Refill Phone</Link>
            <Button
              variantColor="green"
              rightIcon="arrow-forward"
              marginTop={10}
              isFullWidth
            >
              Pay bill
            </Button>
          </Stack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
