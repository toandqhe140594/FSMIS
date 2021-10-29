import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Button, Center } from "native-base";
import React from "react";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";
import { goToFManageStaffManagement } from "../navigations";

const FManageEmployeeDetailScreen = () => {
  const navigation = useNavigation();
  const employeeInfo = useStoreState(
    (actions) => actions.FManageModel.staffDetail,
  );
  const onDeleteEmployee = () => {
    goToFManageStaffManagement(navigation);
  };
  return (
    <>
      <HeaderTab name="Quản lý nhân viên" />
      <Center flex={1} alignItems="center">
        <EmployeeDetailBox
          name={employeeInfo.name}
          dob={employeeInfo.dob}
          phoneNumber={employeeInfo.phoneNumber}
          gender={employeeInfo.gender}
          address={employeeInfo.address}
          isDetailed
        />

        <Center w="70%" bg="lightBlue.100" mb={5}>
          <Button w="100%" onPress={onDeleteEmployee}>
            Xóa nhân viên
          </Button>
        </Center>
      </Center>
    </>
  );
};

export default FManageEmployeeDetailScreen;
