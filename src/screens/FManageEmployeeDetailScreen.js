import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Center } from "native-base";
import React, { useEffect, useState } from "react";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";
import { goBack } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const FManageEmployeeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { staffManagementErrorMsg, staffDetail } = useStoreState(
    (actions) => actions.FManageModel,
  );
  const { getStaffDetailById, deleteStaffById, setStaffManagementErrorMsg } =
    useStoreActions((actions) => actions.FManageModel);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const onDeleteEmployee = () => {
    showAlertConfirmBox(
      "Bạn muốn xóa nhân viên này khỏi hồ",
      `"${staffDetail.fullName}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
      () => {
        deleteStaffById({ userId: staffDetail.id, setDeleteSuccess });
      },
    );
  };

  useEffect(() => {
    // If error occur
    if (staffManagementErrorMsg) showToastMessage(staffManagementErrorMsg);
  }, [staffManagementErrorMsg]);

  useEffect(() => {
    if (deleteSuccess) {
      showToastMessage("Xóa thành công");
      goBack(navigation);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (route.params) getStaffDetailById({ id: route.params.id });
    return () => {
      setStaffManagementErrorMsg("");
    };
  }, []);

  return (
    <>
      <HeaderTab name="Quản lý nhân viên" />
      <Center flex={1} alignItems="center">
        {staffDetail.phone && (
          <EmployeeDetailBox
            name={staffDetail.fullName}
            dob={staffDetail.dob ? staffDetail.dob.split(" ")[0] : ""}
            phoneNumber={staffDetail.phone}
            gender={staffDetail.gender}
            address={staffDetail.address}
            isDetailed
            image={staffDetail.avatar}
          />
        )}

        <Center w="70%" bg="lightBlue.100" mb={5}>
          <Button w="100%" onPress={onDeleteEmployee} colorScheme="error">
            Xóa nhân viên
          </Button>
        </Center>
      </Center>
    </>
  );
};

export default FManageEmployeeDetailScreen;
