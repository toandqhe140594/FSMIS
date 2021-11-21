import { useNavigation, useRoute } from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Center, Heading, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import { goToScreen } from "../navigations";

const styles = StyleSheet.create({
  codeFieldRoot: { marginBottom: 10 },
  cell: {
    width: 40,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

let countdownInterval;
const initialCountdown = 90;
const CELL_COUNT = 6; // Length of the OTP code

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const validateOtp = useStoreActions(
    (actions) => actions.UtilModel.validateOtp,
  );
  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);

  const [countdown, setCountdown] = useState(initialCountdown);
  const [loading, setLoading] = useState(false); // State placeholder for future API implement
  const [wrongOTP, setWrongOTP] = useState(false);
  const [value, setValue] = useState("");
  const [success, setSuccess] = useState(null);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  // Reset the countdown timer
  const resetCountdown = () => {
    sendOtp({ phone: route.params.phone });
    setCountdown(initialCountdown); // Reset countdown value
    // Run the countdown timer
    countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  // Event fire when submit OTP
  const onSubmit = (data) => () => {
    setLoading(true);
    validateOtp({
      otp: data,
      phone: route.params.phone,
      setSuccess,
    });
  };

  // Start the countdown timer when component mount
  useEffect(() => {
    resetCountdown();
    return () => {
      clearInterval(countdownInterval); // Clear the countdown timer when component unmount
    };
  }, []);

  useEffect(() => {
    // Clear the interval when countdown timer count to 0
    if (countdown <= 0) clearInterval(countdownInterval);
  }, [countdown]);

  useEffect(() => {
    if (success === true) {
      goToScreen(navigation, route.params.previousScreen, { otpSuccess: true });
    } else if (success === false) {
      setWrongOTP(true);
      setLoading(false);
      setSuccess(null);
    }
  }, [success]);

  return (
    <Center flex={1}>
      <Heading size="lg">Xác nhận OTP</Heading>
      <Text fontSize="lg" noOfLines={2} textAlign="center" w="70%">
        Vui lòng nhập mã xác nhận đã được gửi tới SĐT của bạn
      </Text>
      {/* Placeholder for phonenumber | Phonenumber will need to get from store state */}
      <Text bold fontSize="lg" mt={4} textAlign="center">
        {route.params?.phone}
      </Text>
      <Text fontSize="lg" color="error.500" textAlign="left" w="70%" italic>
        {wrongOTP && "Mã OTP không chính xác"}
      </Text>
      <VStack mt={2} mb={8} space={4} w="70%">
        {/* OTP code field */}
        <CodeField
          ref={ref}
          {...props}
          caretHidden={false}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          rootStyle={styles.codeFieldRoot}
          textContentType="oneTimeCode"
          value={value}
          onChangeText={setValue}
          renderCell={({ index, symbol, isFocused }) => (
            // Single field
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        {/* Submit button */}
        <Button
          isDisabled={value.length < 6 || loading}
          isLoading={loading}
          // Style for loading state
          _loading={{
            bg: "primary.500",
            _text: {
              color: "#000",
            },
          }}
          isLoadingText="Đang xử lý"
          size="lg"
          w="100%"
          onPress={onSubmit(value)}
        >
          <Text color="white" fontSize="lg">
            Tiếp tục
          </Text>
        </Button>
      </VStack>
      <Center mb={4}>
        <Text fontSize="lg">Bạn chưa nhận được mã?</Text>
        <Text fontSize="lg">Yêu cầu nhập mã mới trong</Text>
      </Center>
      {/* Show countdown section if not currently waiting response from API */}
      {!loading &&
        // Countdown section
        (countdown > 0 ? (
          <Text bold fontSize="lg" textAlign="center" height={12}>
            {/* separate countdown to format minutes:seconds */}
            {`${Math.floor(countdown / 60)}:${(
              countdown -
              Math.floor(countdown / 60) * 60
            )
              .toString()
              // Append leading zero if the seconds < 10
              .padStart(2, "0")}`}
          </Text>
        ) : (
          <Button height={12} size="lg" w="40%" onPress={resetCountdown}>
            <Text color="white" fontSize="xl">
              Gửi lại
            </Text>
          </Button>
        ))}
    </Center>
  );
};

export default OTPScreen;
