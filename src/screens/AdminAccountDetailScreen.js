import { useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";
import { showToastMessage } from "../utilities";

const AdminAccountDetailScreen = () => {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  const accountInformation = useStoreState(
    (states) => states.AccountManagementModel.accountInformation,
  );
  const activateAccount = useStoreActions(
    (actions) => actions.AccountManagementModel.activateAccount,
  );
  const getAccountInformation = useStoreActions(
    (actions) => actions.AccountManagementModel.getAccountInformation,
  );
  const clearAccountInformation = useStoreActions(
    (actions) => actions.AccountManagementModel.clearAccountInformation,
  );

  let activationTimeout = null;

  const changeAccountStatus = () => {
    setIsLoading(true);
    activationTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    activateAccount({ setSuccess });
  };

  useEffect(() => {
    if (route.params.id) {
      getAccountInformation({
        id: route.params.id,
        setLoading: setScreenLoading,
      });
    }
    return () => {
      clearAccountInformation();
      if (activationTimeout !== null) clearTimeout(activationTimeout);
    };
  }, []);

  useEffect(() => {
    if (success !== null) {
      setIsLoading(false);
    }
    if (success === false) showToastMessage("Thao tác thất bại");
    setSuccess(null);
  }, [success]);

  if (screenLoading)
    return (
      <>
        <HeaderTab name="Quản lý tài khoản" />
        <Box flex={1} alignItems="center" justifyContent="flex-start">
          <ActivityIndicator size="large" color="blue" />
        </Box>
      </>
    );

  return (
    <>
      <HeaderTab name="Quản lý tài khoản" />
      <Box flex={1} alignItems="center" justifyContent="flex-start">
        {accountInformation.id ? (
          <>
            <EmployeeDetailBox
              name={accountInformation.fullName}
              dob={accountInformation.dob.split(" ")[0] || "Không có dữ liệu"}
              phoneNumber={accountInformation.phone}
              gender={accountInformation.gender}
              address={accountInformation.address}
              isDetailed
              status={accountInformation.active ? "active" : "inactive"}
              key={accountInformation.id}
              image={accountInformation.avatar}
            />

            <Box w="70%" mb={5}>
              <Button
                w="100%"
                colorScheme={accountInformation.active ? "error" : "emerald"}
                onPress={changeAccountStatus}
                isLoading={isLoading}
              >
                {accountInformation.active
                  ? "Vô hiệu hóa tài khoản"
                  : "Mở lại tài khoản"}
              </Button>
            </Box>
          </>
        ) : (
          <Text>Không có dữ liệu</Text>
        )}
      </Box>
    </>
  );
};

export default AdminAccountDetailScreen;
