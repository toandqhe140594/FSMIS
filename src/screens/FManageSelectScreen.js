import { VStack } from "native-base";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";

const spotExample = [
  {
    id: 1,
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: 2,
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
];

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
      <ScrollView contentContainerStyle={getEmptyListStyling()}>
        <View style={[styles.center, getEmptyListStyling()]}>
          <Pressable onPress={() => {}}>
            <View style={styles.border}>
              <Text style={{ fontSize: 12 }}>Thêm điểm câu</Text>
            </View>
          </Pressable>

          {spotExample.length > 0 && (
            <VStack w="90%" space={2} my={2}>
              {spotExample.map((spot) => (
                <FLocationCard {...spot} isManaged key={spot.id} />
              ))}
            </VStack>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default FlocationSelectorScreen;
