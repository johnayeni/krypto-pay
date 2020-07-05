import React from "react";
import { Box, Image, Text } from "@chakra-ui/core";

interface Props {
  [key: string]: any;
}

const ProductItem: React.FC<Props> = ({ product, handleSelectProduct }) => {
  return (
    <Box
      width="200px"
      height="200px"
      borderRadius="8px"
      display="grid"
      padding="10px"
      gridTemplateColumns="1fr"
      gridTemplateRows="60% 40%"
      cursor="pointer"
      gridRowGap="10px"
      marginY="15px"
      boxShadow="rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.1) 0px 2px 3px"
      onClick={() =>
        handleSelectProduct({
          ...product,
          image: getImage([
            product.name,
            product.short_name,
            product.biller_name,
          ]),
        })
      }
    >
      <Image
        src={getImage([product.name, product.short_name, product.biller_name])}
        alt={product.name}
        width="100px"
        margin="auto"
      />
      <Text fontWeight="600" maxWidth="200px" textAlign="center" margin="auto">
        {product.name}
      </Text>
    </Box>
  );
};

const productImages = {
  airtel: require("app/assets/img/logos/airtel.svg"),
  "9mobile": require("app/assets/img/logos/9mobile.svg"),
  mtn: require("app/assets/img/logos/mtn.svg"),
  glo: require("app/assets/img/logos/glo.svg"),
  dstv: require("app/assets/img/logos/dstv.png"),
  ikedc: require("app/assets/img/logos/ikedc.jpg"),
  ekedc: require("app/assets/img/logos/ekedc.png"),
  gotv: require("app/assets/img/logos/gotv.jpg"),
  smile: require("app/assets/img/logos/smile.png"),
  spectranet: require("app/assets/img/logos/spectranet.png"),
  startimes: require("app/assets/img/logos/startimes.png"),
  vodafone: require("app/assets/img/logos/vodafone.png"),
};

const getImage = (names: string[] = []) => {
  for (let product of Object.keys(productImages)) {
    for (let name of names) {
      if (name.toLowerCase().includes(product)) {
        //@ts-ignore
        return productImages[product];
      }
    }
  }

  return require("app/assets/img/logos/product.svg");
};

export default ProductItem;
