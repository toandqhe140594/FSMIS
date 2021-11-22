import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { VStack } from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";
import FishingMethodModel from "../models/FishingMethodModel";
import FishModel from "../models/FishModel";
import FManageModel from "../models/FManageModel";
import {
  goToFManageAddNewScreen,
  goToFManageSuggestScreen,
} from "../navigations";
import store from "../utilities/Store";

store.addModel("FManageModel", FManageModel);
store.addModel("FishModel", FishModel);
store.addModel("FishingMethodModel", FishingMethodModel);
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
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

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigateToSuggestionScreen = () => {
    goToFManageSuggestScreen(navigation);
  };

  const goToAddLocationScreen = () => {
    goToFManageAddNewScreen(navigation);
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000);
    getListOfFishingLocations(setSuccess);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (success !== null) {
      setSuccess(null);
      setLoading(false);
    }
  }, [success]);

  // Center the add button if the list is emtpy
  const getEmptyListStyling = () =>
    listOfFishingLocations.length === 0
      ? { flex: 1, justifyContent: "center" }
      : {};

  const isStaffStyle = () => {
    if (
      listOfFishingLocations.length > 0 &&
      listOfFishingLocations[0].role === "STAFF"
    )
      return { display: "none" };
    return {};
  };

  if (loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );

  return (
    <>
      <HeaderTab
        name="Chọn điểm câu làm việc"
        customIcon={{
          name: "info-outline",
          color: "blue",
          type: "material",
          onPress: navigateToSuggestionScreen,
        }}
      />
      <ScrollView contentContainerStyle={getEmptyListStyling()}>
        <View style={[styles.center, getEmptyListStyling()]}>
          <Pressable onPress={goToAddLocationScreen}>
            <View style={[styles.border, isStaffStyle()]}>
              <Text style={{ fontSize: 12 }}>Thêm điểm câu</Text>
            </View>
          </Pressable>

          {listOfFishingLocations.length > 0 && (
            <VStack w="90%" space={2} my={2}>
              {listOfFishingLocations.map((location) => {
                const {
                  id,
                  name,
                  image,
                  verify,
                  score,
                  address,
                  role,
                  closed,
                } = location;
                return (
                  <FLocationCard
                    id={id}
                    name={name}
                    image={image}
                    isVerifed={verify}
                    rate={score}
                    address={address}
                    role={role}
                    isManaged
                    isClosed={closed}
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
