import { BarCodeScanner } from "expo-barcode-scanner";
import { Box, Button, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import HeaderTab from "../components/HeaderTab";

const ScanQRCodeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

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
    <Box flex={1} bg="black">
      <HeaderTab name="Quét mã QR" />
      <Box flex={1}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </Box>
      {scanned && (
        <Button onPress={() => setScanned(false)} alignSelf="center" mb="5%">
          Quét lại mã
        </Button>
      )}
    </Box>
  );
};

export default ScanQRCodeScreen;
