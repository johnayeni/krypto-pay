import React from "react";
import { Image, Heading, Text, Stack } from "@chakra-ui/core";

import BitcoinInfoGraphic from "app/assets/img/icons/bitcoin-infographic.svg";
import BillInfoGraphic from "app/assets/img/icons/bill-infographic.svg";
import PhoneInfoGraphic from "app/assets/img/icons/phone-infographic.svg";

interface Props {}

const Features: React.FC<Props> = (props) => {
  return (
    <Stack
      paddingX={[5, 10, "15vw"]}
      paddingTop={50}
      paddingBottom={100}
      direction="row"
      justify="space-between"
      flexWrap="wrap"
    >
      <Stack spacing={5} maxWidth={300} alignItems="baseline" marginY={10}>
        <Image src={BillInfoGraphic} alt="Bills" size="80px" />
        <Heading as="h2" size="lg">
          Pay for TV and Electricity
        </Heading>
        <Text fontSize="xl" fontWeight="600" color="grey">
          Pay for cable subscriptions and electricity bills across supported
          countries and services.
        </Text>
      </Stack>
      <Stack spacing={5} maxWidth={300} alignItems="baseline" marginY={10}>
        <Image src={PhoneInfoGraphic} alt="Phone" size="80px" />
        <Heading as="h2" size="lg">
          Refill your phone
        </Heading>
        <Text fontSize="xl" fontWeight="600" color="grey">
          Top up any phone anywhere for supported countries and operators.
        </Text>
      </Stack>
      <Stack spacing={5} maxWidth={300} alignItems="baseline" marginY={10}>
        <Image src={BitcoinInfoGraphic} alt="Bitcoin" size="80px" />
        <Heading as="h2" size="lg">
          Pay with Bitcoin
        </Heading>
        <Text fontSize="xl" fontWeight="600" color="grey">
          Take advantage of the limitless features of bitcoin and crypto
          currency payments.
        </Text>
      </Stack>
    </Stack>
  );
};

export default Features;
