import { Box, Button, HStack, Input, Select, Text, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  rowWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    width: "60%",
  },
  textWrapper: {
    width: "40%",
  },
  input: {
    height: 40,
    fontSize: 14,
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
      <HStack style={styles.rowWrapper}>
        <Box>
          <Text fontSize="sm">Loại cá</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Select
            style={styles.input}
            accessibilityLabel="Chọn loại cá"
            placeholder="Chọn loại cá"
          >
            <Select.Item label="Cá diếc" value={1} />
            <Select.Item label="Cá chép" value={2} />
          </Select>
        </Box>
      </HStack>
      <HStack style={styles.rowWrapper}>
        <Box style={styles.textWrapper}>
          <Text>Biểu</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Input style={styles.input} placeholder="Miêu tả biểu cá" />
        </Box>
      </HStack>
      <HStack style={styles.rowWrapper}>
        <Box style={styles.textWrapper}>
          <Text>Số lượng (con)</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Input style={styles.input} placeholder="Nhập số lượng con" />
        </Box>
      </HStack>
      <HStack style={styles.rowWrapper}>
        <Box style={styles.textWrapper}>
          <Text>Tổng cân nặng (kg)</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Input style={styles.input} placeholder="Nhập tổng cân nặng" />
        </Box>
      </HStack>
      <VStack style={{ alignItems: "flex-end" }}>
        <Button w="40%">Xoá</Button>
      </VStack>
    </VStack>
  );
};

export default CatchReportCard;
