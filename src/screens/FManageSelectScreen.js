import { Box, Center, ScrollView, VStack } from "native-base";
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
      <HeaderTab name="Chọn điểm câu làm việc" />
      <ScrollView _contentContainerStyle={getEmptyListStyling()}>
        <Center style={getEmptyListStyling()}>
          <Box style={{ marginTop: 1 }}>
            <AddImageButton />
          </Box>
          {spotExample.length > 0 && (
            <VStack w="90%" space={2} my={2}>
              {spotExample.map((spot) => (
                <SpotCard {...spot} isManaged />
              ))}
            </VStack>
          )}
        </Center>
      </ScrollView>
    </>
  );
};

export default FlocationSelectorScreen;
