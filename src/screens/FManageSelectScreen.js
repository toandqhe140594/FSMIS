import { Box, Center, ScrollView } from "native-base";
import React from "react";

import AddImageButton from "../components/common/AddImageButton";
import SpotCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";

const spotExample = [
  {
    id: "spot1",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot2",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot3",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot4",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
  {
    id: "spot5",
    address: "Hưng Yên",
    image: "https://wallpaperaccess.com/full/317501.jpg",
    isVerifed: true,
    name: "Ho cau thuan viet",
    rate: 4,
  },
];

const FlocationSelectorScreen = () => {
  // Center the add button if the list is emtpy
  const getEmptyListStyling = () =>
    spotExample.length === 0 ? { flex: 1, justifyContent: "center" } : {};

  return (
    <>
      <ScrollView>
        <HeaderTab name="Chọn hồ câu của bạn" />
        <Center style={getEmptyListStyling()}>
          {/* Show the list if it is not empty */}
          {spotExample.map((spot) => (
            <Box mt={3} w="90%" key={spot.id}>
              <SpotCard {...spot} isManaged />
            </Box>
          ))}
          <AddImageButton />
        </Center>
      </ScrollView>
    </>
  );
};

export default FlocationSelectorScreen;
