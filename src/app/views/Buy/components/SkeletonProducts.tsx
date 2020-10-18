import React from "react";
import { Skeleton, Stack } from "@chakra-ui/core";

interface Props {}

const SkeletonProducts: React.FC<Props> = (props) => {
  const placeholderItems = Array.from(new Array(6), (_, x) => x);
  return (
    <Stack
      direction="row"
      justify="space-evenly"
      flexWrap="wrap"
      paddingX={[5, 10, "15vw"]}
      marginY={10}
    >
      {placeholderItems.map((_, index) => (
        <Skeleton
          key={index}
          height="200px"
          width="200px"
          colorStart="#F0F2F5"
          colorEnd="#f0f2f54f"
          marginY={10}
        />
      ))}
    </Stack>
  );
};

export default SkeletonProducts;
