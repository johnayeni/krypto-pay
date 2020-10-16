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

  const [refillType, setRefillType] = React.useState<string>("all");

  const handleRefillTypeChange = (event: any) => setRefillType(event.target.value);

  const { data: categories, loading, error } = useFetch(getCategories);

  const types = React.useMemo(() => {
    const _types = new Set();
    categories.forEach((category) => _types.add(category.biller_name));
    return Array.from(_types);
  }, [categories]);

  const filteredProducts = React.useMemo(
    () =>
      categories
        .filter((category) => {
          if (refillType === "all") {
            return true;
          }
          return category.biller_name === refillType;
        })
        .filter((category) => category.name.toLowerCase().includes(query.toLowerCase())),
    [categories, query, refillType]
  );

  return {
    query,
    refillType,
    types,
    isModalOpen,
    loading,
    filteredProducts,
    error,

    handleRefillTypeChange,
    handleSelectProduct,
    selectedProduct,
    handleQueryChange,
    onCloseModal,
  };
}
