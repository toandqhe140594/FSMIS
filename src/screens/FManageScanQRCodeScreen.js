import { useNavigation } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Box, Button, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";
import { DEFAULT_TIMEOUT } from "../constants";
import { goToFManageVerifyCheckinScreen } from "../navigations";
import { showAlertBox, showToastMessage } from "../utilities";

let timeout = null;

const clearLoadingTimeout = () => {
  if (timeout != null) clearTimeout(timeout);
};

const ScanQRCodeScreen = () => {
  const navigation = useNavigation();

  const checkInAngler = useStoreActions(
    (actions) => actions.FManageModel.checkInAngler,
  );

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // If user scan something other than qrcode
    if (type !== 256) {
      showAlertBox("Cảnh báo", `Ứng dụng không hỗ trợ loại mã này`);
      return;
    }
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
    }, DEFAULT_TIMEOUT);
    checkInAngler({ qrString: data, setSuccess });
  };

  useEffect(() => {
    // If checkin angler successfully
    if (success === true) {
      showToastMessage("Checkin cần thủ thành công");
      goToFManageVerifyCheckinScreen(navigation);
    }
    // If success state is not null
    if (success !== null) {
      setLoading(false);
      clearLoadingTimeout();
    }
    setSuccess(null);
  }, [success]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    return () => {
      clearLoadingTimeout();
    };
  }, []);

  const resetScanner = () => setScanned(false);

  if (hasPermission === null) {
    return (
      <Box flex={1}>
        <HeaderTab name="Quét mã QR" />
        <Box flex={1} justifyContent="center" alignItems="center">
          <Text>Đang xin quyền sử dụng máy ảnh</Text>
        </Box>
      </Box>
    );
  }

  if (hasPermission === false) {
    return (
      <Box flex={1}>
        <HeaderTab name="Quét mã QR" />
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          w="80%"
          alignSelf="center"
        >
          <Text textAlign="center">
            Ứng dụng cần truy cập vào <Text bold>máy ảnh</Text> để sử dụng chức
            năng này
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box flex={1} bg="black">
        <HeaderTab name="Quét mã QR" />
        <Box flex={1}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </Box>
        {scanned && (
          <Button onPress={resetScanner} alignSelf="center" mb="5%">
            Quét lại mã
          </Button>
        )}
      </Box>
      <Overlay isVisible={loading}>
        <Box w={200} justifyContent="center" alignItems="center">
          <Text mb={2}>Đang xử lý</Text>
          <ActivityIndicator size="large" color="blue" />
        </Box>
      </Overlay>
    </>
  );
};

export default ScanQRCodeScreen;
