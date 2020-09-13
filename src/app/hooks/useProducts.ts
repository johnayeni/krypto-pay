import React from "react";
import useFetch from "app/hooks/useFetch";
import { useDisclosure } from "@chakra-ui/core";
import { getCategories } from "app/api";

export default function useProducts() {
  const { isOpen: isModalOpen, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();

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

  const handleRefillTypeChange = (event: any) => setRefillType(event.target.value);

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
        .filter((category) => category.name.toLowerCase().includes(query.toLowerCase())),
    [products, query, refillType]
  );

  const types = React.useMemo(() => {
    const _types = new Set();
    products.forEach((product) => _types.add(product.biller_name));
    return Array.from(_types);
  }, [products]);

  return {
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
  };
}
