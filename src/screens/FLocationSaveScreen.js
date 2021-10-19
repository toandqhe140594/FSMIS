import { useStoreState } from "easy-peasy";
import { Box, ScrollView, VStack } from "native-base";
import React from "react";

import FLocationCard from "../components/FLocationCard";

const FLocationSaveScreen = () => {
  const savedLocationList = useStoreState(
    (states) => states.ProfileModel.savedLocationList,
  );

  return (
    <ScrollView mt={2} maxHeight="99%">
      <Box
        flex={1}
        alignItems="center"
        w={{ base: "90%", md: "50%", lg: "30%" }}
        alignSelf="center"
      >
        <VStack w="100%" space={3}>
          {savedLocationList &&
            savedLocationList.map((location) => (
              <FLocationCard
                id={location.id}
                address={location.address}
                name={location.name}
                rate={location.rate}
                key={location.id}
              />
            ))}
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default FLocationSaveScreen;
