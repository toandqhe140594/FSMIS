import { useNavigation } from "@react-navigation/native";
import { useStoreState } from "easy-peasy";
import { Box, Button, Center, Text } from "native-base";
import React from "react";
import QRCode from "react-native-qrcode-svg";

import FLocationCard from "../components/FLocationCard";
import { goToCatchReportFormScreen } from "../navigations";

// After checkin successful at a location
const CheckinSuccessScreen = () => {
  const navigation = useNavigation();
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
          address="140 Láng hòa lạc"
          name="Hồ câu Thuần Việt"
          isVerifed
          rate={3.5}
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
        <Button size="lg">Check out</Button>
      </Box>
    </Box>
  );
};

const DefaultQRCodeScreen = () => {
  const userProfile = useStoreState((states) => states.userProfile);
  const [qrString, setQrString] = React.useState(null);

  React.useEffect(() => {
    if (userProfile && userProfile.qrString) setQrString(userProfile.qrString);
  }, [userProfile]);

  return (
    <Center flex={1}>
      <Center w="80%">
        <Text bold textAlign="center" mb="10%">
          Hãy để nhân viên được quét mã QR để được Checkin và Báo cá
        </Text>
        <QRCode
          logo={require("../assets/images/logo.png")}
          logoSize={50}
          size={200}
          value={qrString || "Default QR DATA"}
        />
      </Center>
    </Center>
  );
};

const CheckinScreen = () => {
  return <DefaultQRCodeScreen />;
};

export default CheckinScreen;
