import {
  Box,
  Button,
  Checkbox,
  HStack,
  Input,
  Select,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "black",
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
});

const CatchReportCard = () => {
  return (
    <VStack space={2} style={styles.cardWrapper}>
      <HStack style={styles.rowWrapper}>
        <Box>
          <Text fontSize="sm">Chọn loài cá</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Select
            h={10}
            accessibilityLabel="Chọn hồ câu"
            placeholder="Chọn hồ câu"
          >
            <Select.Item label="Cá diếc" value={1} />
            <Select.Item label="Cá chép" value={2} />
          </Select>
        </Box>
      </HStack>
      <HStack style={styles.rowWrapper}>
        <Box style={styles.textWrapper}>
          <Text>Số lượng (con)</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Input placeholder="Nhập số lượng con" />
        </Box>
      </HStack>
      <HStack style={styles.rowWrapper}>
        <Box style={styles.textWrapper}>
          <Text>Tổng cân nặng (kg)</Text>
        </Box>
        <Box style={styles.inputWrapper}>
          <Input h={10} placeholder="Nhập tổng cân nặng" />
        </Box>
      </HStack>
      <HStack style={styles.rowWrapper}>
        <Checkbox size="" style={{ borderColor: "red", borderWidth: 1 }}>
          Giao lại cho chủ hồ
        </Checkbox>
        <Button w="40%">Xoá</Button>
      </HStack>
    </VStack>
  );
};

export default CatchReportCard;
