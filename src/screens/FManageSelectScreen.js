import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Center, ScrollView, VStack } from "native-base";
import React from "react";

import AddImageButton from "../components/common/AddImageButton";
import SpotCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import FManageModel from "../models/FManageModel";
import { goToFManageEditProfileScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FManageModel", FManageModel);

const FlocationSelectorScreen = () => {
  // Center the add button if the list is emtpy
  const navigation = useNavigation();

  const listOfFishingLocations = useStoreState(
    (actions) => actions.FManageModel.listOfFishingLocations,
  );
  const getEmptyListStyling = () =>
    listOfFishingLocations.length === 0
      ? { flex: 1, justifyContent: "center" }
      : {};

  return (
    <>
      <HeaderTab name="Chọn điểm câu làm việc" />
      <ScrollView _contentContainerStyle={getEmptyListStyling()}>
        <Center style={getEmptyListStyling()}>
          <Box style={{ marginTop: 1 }}>
            <AddImageButton
              onPress={() => {
                goToFManageEditProfileScreen(navigation);
              }}
            />
          </Box>
          {listOfFishingLocations.length > 0 && (
            <VStack w="90%" space={2} my={2}>
              {listOfFishingLocations.map((spot) => (
                <SpotCard {...spot} isManaged key={spot.id} />
              ))}
            </VStack>
          )}
        </Center>
      </ScrollView>
    </>
  );
};

export default FlocationSelectorScreen;
