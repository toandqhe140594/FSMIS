import { HStack } from "native-base";
import React from "react";

import AddImageButton from "./AddImageButton";
import InteractiveImageBox from "./InteractiveImageBox";

const AddImageSection = () => {
  return (
    <HStack justifyContent="space-between" alignItems="center">
      <InteractiveImageBox />
      <InteractiveImageBox />
      <AddImageButton />
    </HStack>
  );
};

export default AddImageSection;
