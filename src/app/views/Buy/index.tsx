import React from "react";
import useFetch from "app/hooks/useFetch";
import { RouteComponentProps } from "@reach/router";
import {
  Box,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  useDisclosure,
} from "@chakra-ui/core";
import NavBar from "app/components/NavBar";
import ProductItem from "app/views/Buy/components/ProductItem";
import ProductFilters from "app/views/Buy/components/ProductFilters";
import PurchaseModal from "app/views/Buy/components/PurchaseModal";
import SkeletonProducts from "app/views/Buy/components/SkeletonProducts";
import { getCategories } from "app/api";

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

  const { data: categories, loading, error } = useFetch(getCategories);

  const products = React.useMemo(
    () => categories.filter((category) => category.country === country),
    [categories, country]
  );

  const filteredProducts = React.useMemo(
    () =>
      products
        .filter((category) => {
          if (refillType === "all") {
            return true;
          }
          return category.biller_name === refillType;
        })
        .filter((category) =>
          category.name.toLowerCase().includes(query.toLowerCase())
        ),
    [products, query, refillType]
  );

  const types = React.useMemo(() => {
    const _types = new Set();
    products.forEach((product) => _types.add(product.biller_name));
    return Array.from(_types);
  }, [products]);

  return (
    <Box backgroundColor="lightGrey">
      <NavBar isElevated={true} />
      <ProductFilters
        {...{
          query,
          handleQueryChange,
          refillType,
          country,
          handleCountryChange,
          types,
          handleRefillTypeChange,
        }}
      />
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
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((product) => (
                    <ProductItem
                      key={product.id}
                      {...{ product, handleSelectProduct }}
                    />
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
          key={String(selectedProduct)}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          product={selectedProduct}
        />
      )}
    </Box>
  );
};

export default Buy;
