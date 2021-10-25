import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, VStack } from "native-base";
import React, { useEffect } from "react";
import { FlatList } from "react-native";

import FLocationCard from "../components/FLocationCard";

const ItemSeparator = () => {
  return <Box h={5} />;
};

const FLocationSaveScreen = () => {
  const { savedLocationCurrentPage, savedLocationList } = useStoreState(
    (states) => states.ProfileModel,
  );

  const getSavedLocationList = useStoreActions(
    (actions) => actions.ProfileModel.getSavedLocationList,
  );

  useEffect(() => {
    if (savedLocationCurrentPage === 1) getSavedLocationList();
  }, []);

  return (
    <Box
      flex={1}
      alignItems="center"
      w={{ base: "90%", md: "50%", lg: "30%" }}
      alignSelf="center"
      py={3}
    >
      <VStack w="100%" space={3}>
        {savedLocationList && (
          <FlatList
            data={savedLocationList}
            renderItem={({ item }) => (
              <FLocationCard
                id={item.id}
                address={item.address}
                name={item.name}
                rate={item.score}
                key={item.id}
                isVerifed={item.verify}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={() => {
              getSavedLocationList();
            }}
          />
        )}
      </VStack>
    </Box>
  );
};

export default FLocationSaveScreen;
