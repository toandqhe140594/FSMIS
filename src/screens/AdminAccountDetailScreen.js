import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";

import EmployeeDetailBox from "../components/EmployeeDetailBox";
import HeaderTab from "../components/HeaderTab";
import { DEFAULT_TIMEOUT } from "../constants";
import { goToAdminAccountDeactiveScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const AdminAccountDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);

  const accountInformation = useStoreState(
    (states) => states.AccountManagementModel.accountInformation,
  );
  const getAccountInformation = useStoreActions(
    (actions) => actions.AccountManagementModel.getAccountInformation,
  );
  const clearAccountInformation = useStoreActions(
    (actions) => actions.AccountManagementModel.clearAccountInformation,
  );
  const whitelistPhoneNumber = useStoreActions(
    (actions) => actions.AccountManagementModel.whitelistPhoneNumber,
  );

  let activationTimeout = null;

  const activateAccountAction = () => {
    setIsLoading(true);
    activationTimeout = setTimeout(() => {
      setIsLoading(false);
    }, DEFAULT_TIMEOUT);
    whitelistPhoneNumber({ phone: accountInformation.phone })
      .then(() => {
        showToastMessage("Kích hoạt tài khoản thành công");
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const changeAccountStatus = () => {
    if (accountInformation.active) {
      goToAdminAccountDeactiveScreen(navigation, {
        phone: accountInformation.phone,
      });
    } else {
      showAlertConfirmBox(
        `Kích hoạt tài khoản "${accountInformation.phone}"?`,
        "Tài khoản được kích hoạt sẽ có thể tham gia vào ứng dụng như bình thường",
        activateAccountAction,
      );
    }
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
              address={
                accountInformation.address.startsWith(",")
                  ? accountInformation.address.slice(1)
                  : accountInformation.address
              }
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
