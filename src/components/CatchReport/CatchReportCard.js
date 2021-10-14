import { Box, Button, Checkbox, Select, Text } from "native-base";
import React from "react";

const CatchReportCard = () => {
  return (
    <Box px={2} style={{ borderColor: "blue", borderWidth: 1 }}>
      <Box
        mt={3}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        {/* Select lake type */}
        <Text bold>Chọn loài cá</Text>
        <Select
          w="62%"
          h={10}
          // style={{ borderColor: "red", borderWidth: 1 }}
          accessibilityLabel="Chọn hồ câu"
          placeholder="Chọn hồ câu"
        >
          <Select.Item label="Cá diếc" value={1} />
          <Select.Item label="Cá chép" value={2} />
        </Select>
      </Box>
      <Box
        mt={3}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        {/* Select lake type */}
        <Text bold>Số lượng (con)</Text>
        <Select
          w="62%"
          h={10}
          // style={{ borderColor: "red", borderWidth: 1 }}
          accessibilityLabel="Chọn hồ câu"
          placeholder="Chọn hồ câu"
        >
          <Select.Item label="Cá diếc" value={1} />
          <Select.Item label="Cá chép" value={2} />
        </Select>
      </Box>
      <Box
        mt={3}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        // style={{ borderColor: "blue", borderWidth: 1 }}
      >
        {/* Select lake type */}
        <Text bold>Tổng cân nặng (kg)</Text>
        <Select
          w="62%"
          h={10}
          // style={{ borderColor: "red", borderWidth: 1 }}
          accessibilityLabel="Chọn hồ câu"
          placeholder="Chọn hồ câu"
        >
          <Select.Item label="Cá diếc" value={1} />
          <Select.Item label="Cá chép" value={2} />
        </Select>
      </Box>
      <Box
        mt={3}
        mb={3}
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
        // style={{ borderColor: "blue", borderWidth: 1 }}
      >
        {/* Select lake type */}
        <Checkbox>Giao lại cho chủ hồ</Checkbox>
        <Button w="30%" variant="subtle" colorScheme="primary">
          Xoá
        </Button>
      </Box>
    </Box>
  );
};

export default CatchReportCard;
