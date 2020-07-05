import React from "react";
import {
  Button,
  Grid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/core";
import PurchaseForm from "./PurchaseForm";
import PurchaseReceipt from "./PurchaseReceipt";
import { createTransaction } from "app/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

interface PaymentResponse {
  transaction: {
    [key: string]: any;
  };
  customer: {
    [key: string]: any;
  };
}

const PurchaseModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const [loading, setLoading] = React.useState(false);

  const [serviceCustomerId, setServiceCustomerId] = React.useState("");

  const handleServiceCustomerIdChange = (event: any) =>
    setServiceCustomerId(event.target.value);

  const [amount, setAmount] = React.useState(
    product.amount ? product.amount : 500
  );
  const handleAmountChange = (event: any) => setAmount(event.target.value);

  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event: any) => setEmail(event.target.value);

  const [paymentResponse, setPaymentResponse] = React.useState<PaymentResponse>(
    { transaction: {}, customer: {} }
  );

  const [showReceipt, setShowReceipt] = React.useState(false);

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

      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      setPaymentResponse(data);
      setShowReceipt(true);
    } catch (error) {
      toast({
        title: "Error occurred",
        description: error.response?.data?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const openPaymentPage = () => {
    if (paymentResponse.transaction?.hosted_url)
      window.location.replace(paymentResponse.transaction.hosted_url);
  };

  React.useEffect(() => {
    setAmount(product.amount ? product.amount : 500);
  }, [product]);

  React.useEffect(() => {
    if (!isOpen) {
      setShowReceipt(false);
      setPaymentResponse({ transaction: {}, customer: {} });
      setEmail("");
      setServiceCustomerId("");
    }
  }, [isOpen]);

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
            {showReceipt ? (
              <PurchaseReceipt
                {...{
                  product,
                  ...paymentResponse,
                }}
              />
            ) : (
              <PurchaseForm
                {...{
                  product,
                  amount,
                  handleAmountChange,
                  serviceCustomerId,
                  handleServiceCustomerIdChange,
                  email,
                  handleEmailChange,
                }}
              />
            )}
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variantColor="green"
            isDisabled={!amount || !serviceCustomerId || !email}
            isLoading={loading}
            onClick={showReceipt ? openPaymentPage : onCreateTransaction}
          >
            {showReceipt ? "Pay" : "Continue"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PurchaseModal;
