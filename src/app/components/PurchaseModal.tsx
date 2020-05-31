import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Box,
  Grid,
  Image,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/core";
import { FaShoppingCart } from "react-icons/fa";
import { createTransaction } from "app/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const PurchaseModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const [loading, setLoading] = React.useState(false);

  const [serviceCustomerId, setServiceCustomerId] = React.useState("");

  const handleServiceCustomerIdChange = (event: any) =>
    setServiceCustomerId(event.target.value);

  const [amount, setAmount] = React.useState(500);
  const handleAmountChange = (event: any) => setAmount(event.target.value);

  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event: any) => setEmail(event.target.value);

  const toast = useToast();

  const onCreateTransaction = async () => {
    setLoading(true);
    try {
      const response = await createTransaction({
        billerCode: product.biller_code,
        itemCode: product.item_code,
        serviceName: product.biller_name,
        country: product.country,
        amount: String(amount),
        serviceCustomerId,
        email,
      });

      window.location.replace(response.transaction.hosted_url);
    } catch (error) {
      toast({
        title: "Error occurred",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent backgroundColor="white">
        <ModalHeader>{product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns={["1fr", "150px 1fr"]}
            templateRows={["1fr", "2fr"]}
            gap={10}
          >
            <Image
              src={product.image}
              alt={product.name}
              width="150px"
              margin={["auto", "inherit"]}
            />
            <Stack spacing={8}>
              <Text fontSize="md" color="grey" fontWeight="600">
                Pay with Bitcoin or Ethereum. Instant email delivery. No account
                required.
              </Text>
              <Box>
                <label htmlFor="amount">Amount (Naira)</label>
                <NumberInput
                  defaultValue={500}
                  min={500}
                  max={100000}
                  size="lg"
                  marginY={5}
                >
                  <NumberInputField
                    type="number"
                    id="amount"
                    backgroundColor="lightGrey.800"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper color="black" />
                    <NumberDecrementStepper color="black" />
                  </NumberInputStepper>
                </NumberInput>
                {amount < 500 && (
                  <Alert status="error" marginY={5}>
                    <AlertIcon />
                    <AlertTitle mr={2}>
                      Cannot purchase less than N 500
                    </AlertTitle>
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
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variantColor="green"
            rightIcon={FaShoppingCart}
            isDisabled={!amount || !serviceCustomerId || !email}
            isLoading={loading}
            onClick={onCreateTransaction}
          >
            Buy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PurchaseModal;
