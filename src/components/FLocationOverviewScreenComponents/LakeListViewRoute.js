import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import HeaderTab from "../HeaderTab";
import LakeCard from "../LakeCard";

const LakeListViewRoute = () => {
  const lakeList = useStoreState((states) => states.LocationModel.lakeList);
  const locationShortInformation = useStoreState(
    (states) => states.LocationModel.locationShortInformation,
  );
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

  const { id, name, isVerified } = locationShortInformation;

  return (
    <ScrollView>
      <Box>
        <HeaderTab id={id} name={name} isVerified={isVerified} flagable />
        <Divider />
        <Box mx="7%">
          {loading && (
            <Box flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator size="large" color="blue" />
            </Box>
          )}
          {!loading && (
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
          )}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default LakeListViewRoute;
