import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Center, ScrollView, VStack } from "native-base";
import React, { useEffect } from "react";

import AddImageButton from "../components/common/AddImageButton";
import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import { goToFManageEditProfileScreen } from "../navigations";

const FlocationSelectorScreen = () => {
  const navigation = useNavigation();

  const listOfFishingLocations = useStoreState(
    (states) => states.FManageModel.listOfFishingLocations,
  );
  const getListOfFishingLocations = useStoreActions(
    (actions) => actions.FManageModel.getListOfFishingLocations,
  );

  useEffect(() => {
    getListOfFishingLocations();
  }, []);

  // Center the add button if the list is emtpy
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
              {listOfFishingLocations.map((location) => {
                const { id, name, image, verify, score, address } = location;
                return (
                  <FLocationCard
                    id={id}
                    name={name}
                    image={image}
                    isVerifed={verify}
                    rate={score}
                    address={address}
                    isManaged
                    key={id}
                  />
                );
              })}
            </VStack>
          )}
        </Center>
      </ScrollView>
    </>
  );
};

export default FlocationSelectorScreen;
