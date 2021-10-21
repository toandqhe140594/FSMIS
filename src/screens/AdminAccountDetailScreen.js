import { Box, Button } from "native-base";
import React from "react";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";

const AdminAccountDetailScreen = () => {
  const status = false;
  return (
    <>
      <HeaderTab name="Quản lý tài khoản" />
      <Box flex={1} alignItems="center" justifyContent="flex-start">
        <EmployeeDetailBox
          name="Đào Quốc Toản"
          dob="15/10/2021"
          phoneNumber="098764434"
          gender
          address="Số 1 hồ Hoàng Kiếm Việt Nam Hà Nội Châu Á"
          isDetailed
          status={status ? "active" : "inactive"}
        />

        <Box w="70%" mb={5}>
          <Button w="100%" colorScheme={status ? "error" : "success"}>
            {status ? "Vô hiệu hóa tài khoản" : "Mở lại tài khoản"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminAccountDetailScreen;
