import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Stack,
} from "@chakra-ui/core";
import { formatMoneyNoCurrency } from "app/utils/helpers";

interface Props {
  [key: string]: any;
}

const PurchaseForm: React.FC<Props> = ({
  product,
  amount,
  handleAmountChange,
  serviceCustomerId,
  handleServiceCustomerIdChange,
  email,
  handleEmailChange,
}) => {
  return (
    <Stack spacing={8}>
      <Text fontSize="md" color="grey" fontWeight="600">
        Pay with Bitcoin or Ethereum. No account required.
      </Text>
      <Box>
        <label htmlFor="amount">Amount (Naira)</label>
        {product.amount ? (
          <Text fontSize="lg" color="black" fontWeight="800">
            {formatMoneyNoCurrency(product.amount)}
          </Text>
        ) : (
          <NumberInput defaultValue={100} min={100} max={35000} size="lg" marginY={5}>
            <NumberInputField
              type="number"
              id="amount"
              backgroundColor="lightGrey.800"
              value={amount}
              isDisabled={!!product.amount}
              isReadOnly={product.amount}
              onChange={handleAmountChange}
            />
            <NumberInputStepper>
              <NumberIncrementStepper color="black" />
              <NumberDecrementStepper color="black" />
            </NumberInputStepper>
          </NumberInput>
        )}
        {amount < 100 && !product.amount && (
          <Alert status="error" marginY={5}>
            <AlertIcon />
            <AlertTitle mr={2}>Cannot purchase less than N 100</AlertTitle>
          </Alert>
        )}
        <Text fontSize="md" color="grey" fontWeight="600">
          Fee: {product.fee}
        </Text>
      </Box>
      <Box>
        <label htmlFor={product.label_name}>{product.label_name}</label>
        <Input
          value={serviceCustomerId}
          onChange={handleServiceCustomerIdChange}
          placeholder={product.label_name}
          aria-label={product.label_name}
          size="lg"
          id={product.label_name}
          variant="filled"
          backgroundColor="lightGrey.800"
          marginTop={5}
        />
      </Box>
      <Box>
        <label htmlFor="email">Email</label>
        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="Your email"
          aria-label="email"
          size="lg"
          id="email"
          variant="filled"
          backgroundColor="lightGrey.800"
          marginY={5}
        />
      </Box>
    </Stack>
  );
};

export default PurchaseForm;
