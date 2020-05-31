import React from "react";
import useCategories from "app/hooks/useCategories";
import { useTransition, animated } from "react-spring";
import { RouteComponentProps } from "@reach/router";
import {
  Box,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
  Image,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  useDisclosure,
} from "@chakra-ui/core";
import NavBar from "app/components/NavBar";
import PurchaseModal from "app/components/PurchaseModal";
import SkeletonProducts from "app/components/SkeletonProducts";

const productImages = {
  airtel: require("app/assets/img/logos/airtel.svg"),
  "9mobile": require("app/assets/img/logos/9mobile.svg"),
  mtn: require("app/assets/img/logos/mtn.svg"),
  glo: require("app/assets/img/logos/glo.svg"),
  dstv: require("app/assets/img/logos/dstv.png"),
  ikedc: require("app/assets/img/logos/ikedc.jpg"),
  ekedc: require("app/assets/img/logos/ekedc.png"),
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

  return require("app/assets/img/logos/placeholder.svg");
};

interface Props extends RouteComponentProps {}

const Buy: React.FC<Props> = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleSelectProduct = (product: any) => {
    setSelectedProduct(product);
    onOpenModal();
  };

  const [query, setQuery] = React.useState<string>("");

  const handleQueryChange = (event: any) => setQuery(event.target.value);

  const [country, setCountry] = React.useState<string>("NG");

  const handleCountryChange = (event: any) => setCountry(event.target.value);

  const [refillType, setRefillType] = React.useState<string>("all");

  const handleRefillTypeChange = (event: any) =>
    setRefillType(event.target.value);

  const { categories, loading, error } = useCategories();

  const products = React.useMemo(
    () =>
      categories
        .filter((category) => category.country === country)
        .filter((category) => {
          if (refillType === "airtime") {
            return category.is_airtime;
          } else if (refillType === "bill") {
            return !category.is_airtime;
          }
          return true;
        })
        .filter((category) =>
          category.name.toLowerCase().includes(query.toLowerCase())
        ),
    [categories, country, query, refillType]
  );

  const transitions = useTransition(products, (item) => item.id, {
    from: { opacity: 0, transform: "scale(0.5)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.5)" },
    reset: true,
  });

  return (
    <Box backgroundColor="lightGrey">
      <NavBar isElevated={true} />
      <Stack
        paddingX={[5, 10, "15vw"]}
        direction="row"
        justify={["space-evenly"]}
        paddingTop={50}
        flexWrap="wrap"
      >
        <InputGroup size="lg" flexGrow={1} maxWidth="300px" marginY="5px">
          <InputLeftElement
            children={<Icon name="search" color="gray.300" />}
          />
          <Input
            value={query}
            onChange={handleQueryChange}
            placeholder={`Search ${refillType} providers`}
            size="lg"
            variant="filled"
            backgroundColor="lightGrey.800"
          />
        </InputGroup>
        <Stack direction="row" alignItems="center" boxSizing="border-box">
          <Image
            src={`https://www.countryflags.io/${country.toLowerCase()}/flat/32.png`}
          />
          <Select
            placeholder="Select country"
            backgroundColor="lightGrey.800"
            marginY="5px"
            size="lg"
            variant="filled"
            color="black"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="NG">Nigeria</option>
            <option value="GH">Ghana</option>
            <option value="KE">Kenya</option>
            <option value="US">United States</option>
          </Select>
        </Stack>
        <Select
          placeholder="Select refill type"
          flexGrow={1}
          maxWidth="300px"
          backgroundColor="lightGrey.800"
          marginY="5px"
          size="lg"
          variant="filled"
          color="black"
          value={refillType}
          onChange={handleRefillTypeChange}
        >
          <option value="all">All</option>
          <option value="airtime">Airtime</option>
          <option value="bill">Bill</option>
        </Select>
      </Stack>
      {loading ? (
        <SkeletonProducts />
      ) : (
        <Stack
          direction="row"
          justify="space-evenly"
          flexWrap="wrap"
          paddingX={[5, 10, "15vw"]}
        >
          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error occurred fetching products</AlertTitle>
            </Alert>
          ) : (
            <>
              {products.length > 0 ? (
                <>
                  {transitions.map(({ item: product, props, key }) => (
                    <animated.div key={key} style={props}>
                      <Stack
                        as="button"
                        marginY={10}
                        alignItems="center"
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
                        <Box
                          width="300px"
                          height="200px"
                          borderRadius="8px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow="rgba(0, 0, 0, 0.06) 0px 2px 4px, rgba(0, 0, 0, 0.1) 0px 2px 3px"
                        >
                          <Image
                            src={getImage([
                              product.name,
                              product.short_name,
                              product.biller_name,
                            ])}
                            alt="Airtel"
                            width="120px"
                            margin="auto"
                          />
                        </Box>
                        <Text fontSize="2xl" fontWeight="600">
                          {product.name}
                        </Text>
                      </Stack>
                    </animated.div>
                  ))}
                </>
              ) : (
                <Text color="grey" marginTop={100}>
                  No products available. Try changing your filter query and
                  options
                </Text>
              )}
            </>
          )}
        </Stack>
      )}
      {selectedProduct && (
        <PurchaseModal
          isOpen={isModalOpen}
          onClose={onCloseModal}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};

export default Buy;
