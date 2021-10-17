import { Box, Center, ScrollView, VStack } from "native-base";
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
  // const getEmptyListStyling = () => {};

  return (
    <ScrollView>
      <HeaderTab name="Chỉnh sửa bài đăng" />
      <Center style={{ flex: 1, justifyContent: "Center" }}>
        <VStack w="90%" />
        <AddImageButton />
      </Center>
    </ScrollView>
  );
};

export default FlocationSelectorScreen;
