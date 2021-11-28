import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";

import LakeCard from "../LakeCard";

const LakeListViewRoute = () => {
  const lakeList = useStoreState((states) => states.LocationModel.lakeList);

  const getLakeList = useStoreActions(
    (actions) => actions.LocationModel.getLakeList,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLakeList();
  }, []);

  useEffect(() => {
    if (lakeList) setLoading(false);
  }, [lakeList]);

  return (
    <ScrollView>
      <Box mx="7%">
        {loading && (
          <Box flex={1} justifyContent="center" alignItems="center">
            <ActivityIndicator size="large" color="blue" />
          </Box>
        )}
        {!loading && lakeList.length > 0 ? (
          <VStack mt={5} space={2}>
            {lakeList.map((lake) => (
              <LakeCard
                id={lake.id}
                image={lake.image}
                listOfFishes={lake.fishList}
                name={lake.name}
                key={lake.id}
              />
            ))}
          </VStack>
        ) : (
          <Box flex={1} alignItems="center" justifyContent="center">
            <Text>Danh sách hồ còn trống.</Text>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};

export default LakeListViewRoute;
