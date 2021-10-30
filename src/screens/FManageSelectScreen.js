import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { VStack } from "native-base";
import React, { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import FManageModel from "../models/FManageModel";
import { goToFManageEditProfileScreen } from "../navigations";
import store from "../utilities/Store";

store.addModel("FManageModel", FManageModel);
const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  border: {
    width: 110,
    height: 110,
    marginTop: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});

const FManageSelectScreen = () => {
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
      <ScrollView contentContainerStyle={getEmptyListStyling()}>
        <View style={[styles.center, getEmptyListStyling()]}>
          <Pressable
            onPress={() => {
              goToFManageEditProfileScreen(navigation);
            }}
          >
            <View style={styles.border}>
              <Text style={{ fontSize: 12 }}>Thêm điểm câu</Text>
            </View>
          </Pressable>

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
        </View>
      </ScrollView>
    </>
  );
};

export default FManageSelectScreen;
