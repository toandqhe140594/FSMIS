import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

import SmallScreenLoadingIndicator from "../common/SmallScreenLoadingIndicator";
import LakeCard from "../LakeCard";

const LakeListViewRoute = () => {
  const lakeList = useStoreState((states) => states.LocationModel.lakeList);

  const getLakeList = useStoreActions(
    (actions) => actions.LocationModel.getLakeList,
  );

  const [loading, setLoading] = useState(true);

  // Hide screen loading indicator
  const closeLoadingIndicator = () => setLoading(false);

  useEffect(() => {
    getLakeList().then(closeLoadingIndicator).catch(closeLoadingIndicator);
  }, []);

  if (loading) return <SmallScreenLoadingIndicator />;

  return (
    <ScrollView>
      <Box mx="7%">
        {lakeList.length > 0 ? (
          <>
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
          </>
        ) : (
          <Center flex={1} minHeight={600}>
            <Text>Không có dữ liệu </Text>
          </Center>
        )}
      </Box>
    </ScrollView>
  );
};

export default LakeListViewRoute;
