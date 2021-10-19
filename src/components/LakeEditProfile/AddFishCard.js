import { Button, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

import InlineInputComponent from "../common/InlineInputComponent";
import InlineSelectComponent from "../common/InlineSelectComponent";

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
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
        compact
        label="Loại cá"
        placeholder="Chọn loại cá"
        data={["Cá diếc", " Cá chép"]}
      />
      <InlineInputComponent
        compact
        label="Biểu"
        placeholder="Miêu tả biểu cá"
      />
      <InlineInputComponent
        compact
        label="Số lượng (con)"
        placeholder="Nhập số lượng con"
      />
      <InlineInputComponent
        compact
        label="Tổng cân nặng (kg)"
        placeholder="Nhập tổng cân nặng"
      />
      <Button w="40%" style={{ alignSelf: "flex-end" }}>
        Xoá
      </Button>
    </VStack>
  );
};

export default CatchReportCard;
