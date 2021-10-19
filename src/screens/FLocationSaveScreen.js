import { Box, ScrollView, VStack } from "native-base";
import React from "react";

import FLocationCard from "../components/FLocationCard";

const FLocationSaveScreen = () => {
  return (
    <ScrollView mt={2} maxHeight="99%">
      <Box
        flex={1}
        alignItems="center"
        w={{ base: "90%", md: "50%", lg: "30%" }}
        alignSelf="center"
      >
        <VStack w="100%" space={3}>
          <FLocationCard
            address="140 Láng hòa lạc"
            name="Hồ câu Thuần Việt"
            rate={5}
            id={1}
          />
          <FLocationCard
            address="140 Láng hòa lạc"
            name="Hồ câu Thuần Việt"
            rate={3.5}
            id={2}
          />
          <FLocationCard
            address="140 Láng hòa lạc"
            name="Hồ câu Thuần Việt"
            id={9}
          />
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default FLocationSaveScreen;
