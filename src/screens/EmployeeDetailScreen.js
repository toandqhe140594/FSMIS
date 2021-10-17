import { Button, Center } from "native-base";
import React from "react";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";

const EmployeeDetailScreen = () => {
  return (
    <>
      <HeaderTab name="Quản lý nhân viên" />
      <Center flex={1} alignItems="center">
        <EmployeeDetailBox
          name="Đào Quốc Toản"
          dob="15/10/2021"
          phoneNumber="098764434"
          gender
          address="Số 1 hồ Hoàng Kiếm Việt Nam Hà Nội Châu Á"
          isDetailed
        />

        <Center w="70%" bg="lightBlue.100" mb={5}>
          <Button w="100%">Xóa nhân viên</Button>
        </Center>
      </Center>
    </>
  );
};

export default EmployeeDetailScreen;
