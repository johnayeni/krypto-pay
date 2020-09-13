import React from "react";
import { Box, Stack, Text, Alert, AlertIcon, AlertTitle } from "@chakra-ui/core";
import NavBar from "app/components/NavBar";
import ProductItem from "app/views/Buy/components/ProductItem";
import ProductFilters from "app/views/Buy/components/ProductFilters";
import PurchaseModal from "app/views/Buy/components/PurchaseModal";
import SkeletonProducts from "app/views/Buy/components/SkeletonProducts";
import useProducts from "app/hooks/useProducts";

const Buy: React.FC = () => {
  const {
    query,
    refillType,
    country,
    types,
    isModalOpen,
    loading,
    filteredProducts,
    error,

    handleRefillTypeChange,
    handleCountryChange,
    handleSelectProduct,
    selectedProduct,
    handleQueryChange,
    onCloseModal,
  } = useProducts();

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
        <Stack direction="row" justify="space-evenly" flexWrap="wrap" paddingX={[5, 10, "15vw"]}>
          {error ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error occurred fetching products</AlertTitle>
            </Alert>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <>
                  {filteredProducts.map((product: any) => (
                    <ProductItem key={product.id} {...{ product, handleSelectProduct }} />
                  ))}
                </>
              ) : (
                <Text color="grey" marginTop={100}>
                  No products available. Try changing your filter query and options
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
