import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Center } from "native-base";
import React, { useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";
import { goBack } from "../navigations";

const FManageEmployeeDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const { staffManagementErrorMsg, staffDetail } = useStoreState(
    (actions) => actions.FManageModel,
  );
  const { getStaffDetailById, deleteStaffById, setStaffManagementErrorMsg } =
    useStoreActions((actions) => actions.FManageModel);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const onDeleteEmployee = () => {
    Alert.alert(
      "Bạn muốn xóa nhân viên này khỏi hồ",
      `"${staffDetail.name}" sẽ bị xóa vĩnh viễn. Bạn không thể hoàn tác hành động này`,
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Xác nhận",
          onPress: () => {
            deleteStaffById({ userId: staffDetail.id, setDeleteSuccess });
          },
        },
      ],
    );
  };

  useEffect(() => {
    // If error occur
    if (staffManagementErrorMsg)
      ToastAndroid.showWithGravityAndOffset(
        staffManagementErrorMsg,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
  }, [staffManagementErrorMsg]);

  useEffect(() => {
    if (deleteSuccess) goBack(navigation);
  }, [deleteSuccess]);

  useEffect(() => {
    getStaffDetailById({ id });
    return () => {
      setStaffManagementErrorMsg("");
    };
  }, []);

  return (
    <>
      <HeaderTab name="Quản lý nhân viên" />
      <Center flex={1} alignItems="center">
        <EmployeeDetailBox
          name={staffDetail.name}
          dob={staffDetail.dob}
          phoneNumber={staffDetail.phoneNumber}
          gender={staffDetail.gender}
          address={staffDetail.address}
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
