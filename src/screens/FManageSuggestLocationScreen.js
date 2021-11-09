import { Box } from "native-base";
import React from "react";

import HeaderTab from "../components/HeaderTab";

const FManageSuggestLocationScreen = () => {
  return (
    <Box flex={1}>
      <HeaderTab name="Gợi ý hồ câu cho hệ thống" />
      Gợi ý hồ câu mới cho hệ thống Cần cung cấp tên hồ và số điện thoại chủ hồ
    </Box>
  );
};

export default FManageSuggestLocationScreen;
