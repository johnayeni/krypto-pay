import React from "react";
import { Text, Stack, Box } from "@chakra-ui/core";
import { formatMoneyNoCurrency } from "app/utils/helpers";
import useCountdown from "app/hooks/useCountdown";

interface Props {
  [key: string]: any;
}

const PurchaseReceipt: React.FC<Props> = ({
  transaction,
  customer,
  product,
}) => {
  const [endDate] = React.useState(() => {
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 30);
    return endDate;
  });

  const timeLeft = useCountdown(endDate);

  return (
    <Stack>
      <Text fontSize="2xl" color="grey" fontWeight="600">
        Receipt
      </Text>
      <Box>
        <Text>Amount</Text>
        <Text fontSize="lg" color="black" fontWeight="800">
          {formatMoneyNoCurrency(transaction.amount)}
        </Text>
        <Text fontSize="md" color="grey" fontWeight="600">
          Fee: {customer.fee}
        </Text>
      </Box>
      <Box>
        <Text>Email</Text>
        <Text fontSize="lg" color="black" fontWeight="800">
          {transaction.email}
        </Text>
      </Box>
      <Box>
        <Text>{product.label_name}</Text>
        <Text fontSize="lg" color="black" fontWeight="800">
          {customer.customer}
        </Text>
      </Box>
      {customer.name && (
        <Box>
          <Text>Customer name</Text>
          <Text fontSize="lg" color="black" fontWeight="800">
            {customer.name}
          </Text>
        </Box>
      )}
      {customer.address && (
        <Box>
          <Text>Address</Text>
          <Text fontSize="lg" color="black" fontWeight="800">
            {customer.address}
          </Text>
        </Box>
      )}
      <Box>
        <Text>
          Payment link expires in {timeLeft.minutes} : {timeLeft.seconds}
        </Text>
      </Box>
    </Stack>
  );
};

export default PurchaseReceipt;
