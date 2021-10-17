import { VStack } from "native-base";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { styles } from "styled-system";

import AddImageButton from "../components/common/AddImageButton";
import FLocationCard from "../components/FLocationCard";
import HeaderTab from "../components/HeaderTab";

const FlocationSelectorScreen = () => {
  return (
    <ScrollView>
      <HeaderTab name="Chọn hồ câu của bạn" />
      <VStack>
        <FLocationCard />
        <AddImageButton />
      </VStack>
    </ScrollView>
  );
};

export default FlocationSelectorScreen;
