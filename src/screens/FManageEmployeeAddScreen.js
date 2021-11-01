import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Button, Center } from "native-base";
import React, { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { SearchBar } from "react-native-elements";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";
import { goBack } from "../navigations";

const FManageEmployeeAddScreen = () => {
  const navigation = useNavigation();

  const { staffOverview, staffManagementErrorMsg } = useStoreState(
    (states) => states.FManageModel,
  );
  const {
    addStaffById,
    setStaffManagementErrorMsg,
    setStaffOverview,
    findStaffByPhone,
  } = useStoreActions((actions) => actions.FManageModel);

  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(false);

  const updateSearch = (searchKey) => {
    setSearch(searchKey);
  };

  const onEndEditing = () => {
    findStaffByPhone({ phone: search });
  };

  const addStaff = () => {
    addStaffById({ userId: staffOverview.id, setSuccess });
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
    if (success) {
      ToastAndroid.showWithGravityAndOffset(
        "Thêm nhân viên thành công",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      goBack(navigation);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      setStaffOverview({});
      setStaffManagementErrorMsg("");
    };
  }, []);

  return (
    <>
      <HeaderTab name="Thêm nhân viên" />
      <Center flex={1} alignItems="center">
        <Center w="100%">
          <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            containerStyle={{
              width: "100%",
              marginTop: 12,
              backgroundColor: "white",
              paddingHorizontal: 12,
            }}
            lightTheme
            blurOnSubmit
            keyboardType="phone-pad"
            onEndEditing={onEndEditing}
          />
        </Center>
        {staffOverview.id ? (
          <>
            <EmployeeDetailBox
              id={staffOverview.id}
              name={staffOverview.name}
              phoneNumber={staffOverview.phone}
              image={staffOverview.avatar}
            />
            <Center w="70%" bg="lightBlue.100" mb={5}>
              <Button
                w="100%"
                onPress={() => {
                  addStaff();
                }}
              >
                Thêm nhân viên
              </Button>
            </Center>
          </>
        ) : (
          <Center flex={1} />
        )}
      </Center>
    </>
  );
};

export default FManageEmployeeAddScreen;
