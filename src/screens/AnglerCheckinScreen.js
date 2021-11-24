import { useNavigation } from "@react-navigation/native";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, Button, Center, Text } from "native-base";
import React, { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";

import FLocationCard from "../components/FLocationCard";
import CheckInModel from "../models/CheckInModel";
import { goToCatchReportFormScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";
import store from "../utilities/Store";

store.addModel("CheckInModel", CheckInModel);

// After checkin successful at a location
const CheckinSuccessScreen = () => {
  const navigation = useNavigation();

  const locationInfo = useStoreState(
    (states) => states.CheckInModel.fishingLocationInfo,
  );
  const personalCheckout = useStoreActions(
    (actions) => actions.CheckInModel.personalCheckout,
  );
  const getAllFishes = useStoreActions(
    (actions) => actions.CheckInModel.getAllFishes,
  );

  useEffect(() => {
    getAllFishes();
  }, []);

  const showCheckoutAlert = () => {
    showAlertConfirmBox(
      "Checkout",
      "Bạn có muốn checkout mà không báo kết quả câu?",
      () => {
        personalCheckout();
      },
    );
  };

  return (
    <Box
      flex={1}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      py={8}
    >
      <Box flex={1} w="90%" p={0}>
        <Text bold mb={2}>
          Bạn đã check in thành công tại
        </Text>
        <FLocationCard
          id={locationInfo.id}
          address={locationInfo.address}
          name={locationInfo.name}
          isVerifed={locationInfo.verify}
          rate={locationInfo.score}
          isClosed={locationInfo.closed}
          image={locationInfo.image}
        />
      </Box>
      <Box w="70%">
        <Button
          mb={3}
          size="lg"
          onPress={() => {
            goToCatchReportFormScreen(navigation);
          }}
        >
          Báo kết quả câu
        </Button>
        <Button
          size="lg"
          onPress={() => {
            showCheckoutAlert();
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

const DefaultQRCodeScreen = () => {
  const getCheckInState = useStoreActions(
    (actions) => actions.CheckInModel.getCheckInState,
  );

  const userProfile = useStoreState((states) => states.userProfile);
  const [qrString, setQrString] = useState(null);
  const [loading, setLoading] = useState(false);

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
    getCheckInState({ setLoading });
  };

  useEffect(() => {
    getCheckInState({ setLoading });
  }, []);

  useEffect(() => {
    if (userProfile && userProfile.qrString) setQrString(userProfile.qrString);
  }, [userProfile]);

  return (
    <>
      <Center flex={1}>
        <Center w="80%">
          <Text bold textAlign="center" mb="10%">
            Hãy để nhân viên được quét mã QR để được Check-in và Báo cá
          </Text>
          <QRCode
            logo={require("../assets/images/logo.png")}
            logoSize={50}
            size={200}
            value={qrString || "Default QR DATA"}
          />
        </Center>
      </Center>
      <Box justifyContent="flex-end" alignItems="center" mb={10}>
        <Button
          mt={4}
          size="lg"
          px={3}
          onPress={() => {
            onRefresh();
          }}
          w="50%"
          isLoading={loading}
        >
          Kiểm tra trạng thái
        </Button>
      </Box>
    </>
  );
};

const CheckinScreen = () => {
  const stateCheckIn = useStoreState(
    (states) => states.CheckInModel.checkInState,
  );
  const setCheckInState = useStoreActions(
    (actions) => actions.CheckInModel.setCheckInState,
  );

  const [isCheckin, setCheckin] = useState(false);

  useEffect(() => {
    if (stateCheckIn === false) {
      showToastMessage("Bạn chưa checkin ở hồ câu");
      setCheckin(false);
    }
    if (stateCheckIn === true) setCheckin(true);
    setCheckInState(null);
  }, [stateCheckIn]);

  return (
    <>
      {isCheckin === true ? <CheckinSuccessScreen /> : <DefaultQRCodeScreen />}
    </>
  );
};

export default CheckinScreen;
