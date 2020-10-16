import React from "react";
import { useToast } from "@chakra-ui/core";
import { createTransaction } from "app/api";

interface PaymentResponse {
  transaction: {
    [key: string]: any;
  };
  customer: {
    [key: string]: any;
  };
}

export default function usePurchase({ isOpen, product }: { isOpen: boolean; product: any }) {
  const [loading, setLoading] = React.useState(false);

  const [serviceCustomerId, setServiceCustomerId] = React.useState("");

  const handleServiceCustomerIdChange = (event: any) => setServiceCustomerId(event.target.value);

  const [amount, setAmount] = React.useState(product?.amount ? product.amount : 500);
  const handleAmountChange = (event: any) => setAmount(event.target.value);

  const [email, setEmail] = React.useState("");
  const handleEmailChange = (event: any) => setEmail(event.target.value);

  const [paymentResponse, setPaymentResponse] = React.useState<PaymentResponse>({
    transaction: {},
    customer: {},
  });

  const [showReceipt, setShowReceipt] = React.useState(false);

  const toast = useToast();

  const onCreateTransaction = async () => {
    if (amount < 100) {
      toast({
        title: "Invalid amount",
        description: "Amount is less than NGN 100",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (amount > 35000) {
      toast({
        title: "Invalid amount",
        description: "Amount is greater than NGN 35000",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
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
    }
  };

  const openPaymentPage = () => {
    if (paymentResponse.transaction?.hosted_url)
      window.location.replace(paymentResponse.transaction.hosted_url);
  };

  React.useEffect(() => {
    setAmount(product?.amount ? product.amount : 100);
  }, [product]);

  React.useEffect(() => {
    if (!isOpen) {
      setShowReceipt(false);
      setPaymentResponse({ transaction: {}, customer: {} });
      setEmail("");
      setServiceCustomerId("");
    }
  }, [isOpen]);

  return {
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
  };
}
