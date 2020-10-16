import React from "react";
import { Box, Flex, Text } from "@chakra-ui/core";

const Footer: React.FC = () => {
  return (
    <Box bg="green.300" w="100%" paddingY={10} color="black" fontWeight="700">
      <Flex justifyContent="space-between" margin="auto" paddingX={[5, 10, "15vw"]}>
        <Text>&copy;{new Date().getFullYear()} Peeerpay</Text>
        <a
          href="https://www.notion.so/Peeerpay-Privacy-Policy-7041f532fdbd44da9c149beabb0ddced"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </Flex>
    </Box>
  );
};

export default Footer;
