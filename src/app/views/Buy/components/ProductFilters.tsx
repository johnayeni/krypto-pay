import React from "react";
import {
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Select,
  Image,
} from "@chakra-ui/core";

interface Props {
  [key: string]: any;
}

const ProductFilters: React.FC<Props> = ({
  query,
  handleQueryChange,
  refillType,
  country,
  handleCountryChange,
  types,
  handleRefillTypeChange,
}) => {
  return (
    <Stack
      paddingX={[5, 10, "15vw"]}
      direction="row"
      justify={["space-evenly"]}
      paddingTop={50}
      flexWrap="wrap"
    >
      <InputGroup size="lg" flexGrow={1} maxWidth="300px" marginY="5px">
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input
          value={query}
          onChange={handleQueryChange}
          placeholder={`Search`}
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
        {types.map((type: string, index: number) => (
          <option value={type} key={index}>
            {type}
          </option>
        ))}
      </Select>
    </Stack>
  );
};

export default ProductFilters;
