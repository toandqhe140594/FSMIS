import { Button, Checkbox, HStack, VStack } from "native-base";
import React from "react";
import { StyleSheet, Text } from "react-native";

import InlineInputComponent from "../common/InlineInputComponent";
import InlineSelectComponent from "../common/InlineSelectComponent";

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  rowWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const CatchReportCard = () => {
  return (
    <VStack
      shadow={2}
      backgroundColor="trueGray.50"
      space={2}
      style={styles.cardWrapper}
    >
      <InlineSelectComponent
        label="Chọn loài cá"
        placeholder="Nhấp để chọn cá"
        compact
      />
      <InlineInputComponent
        label="Số lượng (con)"
        placeholder="Nhập số lượng con"
        compact
      />
      <InlineInputComponent
        label="Tổng cân nặng (kg)"
        placeholder="Nhập tổng cân nặng"
        compact
      />
      <HStack style={styles.rowWrapper}>
        <Checkbox>
          <Text style={{ marginLeft: 10 }}>Giao lại cho chủ hồ</Text>
        </Checkbox>
        <Button w="40%">Xoá</Button>
      </HStack>
    </VStack>
  );
};

export default CatchReportCard;
