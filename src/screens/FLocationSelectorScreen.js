import { Box, Center, ScrollView } from "native-base";
import React from "react";
import {} from "react-native";

import AddImageButton from "../components/common/AddImageButton";
import SpotCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";

const spotExample = [
  // {
  //   id: "spot1",
  //   address: "Hưng Yên",
  //   image: "https://wallpaperaccess.com/full/317501.jpg",
  //   isVerifed: true,
  //   name: "Ho cau thuan viet",
  //   rate: 4,
  // },
  // {
  //   id: "spot2",
  //   address: "Hưng Yên",
  //   image: "https://wallpaperaccess.com/full/317501.jpg",
  //   isVerifed: true,
  //   name: "Ho cau thuan viet",
  //   rate: 4,
  // },
  // {
  //   id: "spot3",
  //   address: "Hưng Yên",
  //   image: "https://wallpaperaccess.com/full/317501.jpg",
  //   isVerifed: true,
  //   name: "Ho cau thuan viet",
  //   rate: 4,
  // },
  // {
  //   id: "spot4",
  //   address: "Hưng Yên",
  //   image: "https://wallpaperaccess.com/full/317501.jpg",
  //   isVerifed: true,
  //   name: "Ho cau thuan viet",
  //   rate: 4,
  // },
  // {
  //   id: "spot5",
  //   address: "Hưng Yên",
  //   image: "https://wallpaperaccess.com/full/317501.jpg",
  //   isVerifed: true,
  //   name: "Ho cau thuan viet",
  //   rate: 4,
  // },
];

const FlocationSelectorScreen = () => {
  // Center the add button if the list is emtpy
  const getEmptyListStyling = () =>
    spotExample.length === 0 ? { flex: 1, justifyContent: "center" } : {};

  return (
    <>
      <HeaderTab name="Chọn hồ câu của bạn" />
      <Center style={getEmptyListStyling()}>
        {/* Show the list if it is not empty */}
        {spotExample.length > 0 && (
          <ScrollView style={{ width: "90%", marginBottom: 3 }}>
            {spotExample.length &&
              spotExample.map((spot) => (
                <Box mt={3}>
                  <SpotCard {...spot} />
                </Box>
              ))}
          </ScrollView>
        )}
        <AddImageButton />
      </Center>
    </>
  );
};

export default FlocationSelectorScreen;
