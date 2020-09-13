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
} from "@chakra-ui/core";
import PurchaseForm from "./PurchaseForm";
import PurchaseReceipt from "./PurchaseReceipt";
import usePurchase from "app/hooks/usePurchase";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const PurchaseModal: React.FC<Props> = ({ isOpen, onClose, product }) => {
  const {
    showReceipt,
    paymentResponse,
    amount,
    handleAmountChange,
    serviceCustomerId,
    handleServiceCustomerIdChange,
    email,
    handleEmailChange,
    loading,
    openPaymentPage,
    onCreateTransaction,
  } = usePurchase(product);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent backgroundColor="white">
        <ModalHeader>{product.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={["1fr", "150px 1fr"]} templateRows={["1fr", "2fr"]} gap={10}>
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
