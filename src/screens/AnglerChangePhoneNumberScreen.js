import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useStoreActions } from "easy-peasy";
import { Button, Center, Icon, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useCallback, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, useWindowDimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";
import { goToOTPScreen } from "../navigations";
import { showAlertConfirmBox, showToastMessage } from "../utilities";

const VisibilityIcon = ({ visible, toggleVisible }) => (
  <Pressable onPress={toggleVisible}>
    <Icon
      color="muted.500"
      as={<MaterialIcons name={visible ? "visibility" : "visibility-off"} />}
      size={6}
      mx={2}
    />
  </Pressable>
);

VisibilityIcon.propTypes = {
  visible: PropTypes.bool,
  toggleVisible: PropTypes.func,
};

VisibilityIcon.defaultProps = {
  visible: false,
  toggleVisible: () => {},
};

const ChangePhoneNumberScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const formData = useRef(null);
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.CHANGE_PHONE_NUMBER_FORM),
  });
  const { handleSubmit } = methods;

  const sendOtp = useStoreActions((actions) => actions.UtilModel.sendOtp);
  const changePhoneNumber = useStoreActions(
    (actions) => actions.ProfileModel.changePhoneNumber,
  );
  const logOut = useStoreActions((actions) => actions.logOut);

  const handleError = () => {
    setIsLoading(false);
  };

  /**
   * Start change phone number chain action
   * @param {Object} data form data to send to api
   * @param {string} data.phone new phone number that need to be linked with the account
   * @param {string} data.password current password
   * @returns nothing
   */
  const changePhoneNumberAction = (data) => () => {
    setIsLoading(true);
    formData.current = data;
    sendOtp({ phone: data.phone, existedStatus: "NONEXISTED" })
      .then(() => {
        setIsLoading(false);
        goToOTPScreen(
          navigation,
          ROUTE_NAMES.PROFILE_CHANGE_PHONE_NUMBER,
          formData.current.phone,
        );
      })
      .catch(handleError);
  };

  /**
   * Toggle password field visibility
   */
  const handleToggle = () => {
    setVisible(!visible);
  };

  const onSubmit = (data) => {
    showAlertConfirmBox(
      "Đổi số điện thoại",
      "Bạn muốn thay đổi số điện thoại liên kết với tài khoản này?",
      changePhoneNumberAction(data),
    );
  };

  /**
   * Trigger when navigation goes back to this screen
   */
  useFocusEffect(
    // useCallback will listen to route.param
    useCallback(() => {
      if (route.params?.otpSuccess) {
        setIsLoading(true);
        changePhoneNumber({ ...formData.current })
          .then(() => {
            showToastMessage("Thay đổi số điện thoại thành công");
            logOut();
          })
          .catch(handleError);
      }
    }, [route.params]),
  );

  return (
    <Center flex={1} minHeight={Math.round(useWindowDimensions().height)}>
      <HeaderTab name="Thay đổi số điện thoại" />
      <FormProvider {...methods}>
        <VStack
          flex={1}
          justifyContent="center"
          space={3}
          mb={10}
          w={{ base: "70%", md: "50%", lg: "30%" }}
        >
          {/* Phone number input field */}
          <InputComponent
            label="Số điện thoại"
            useNumPad
            isTitle
            hasAsterisk
            placeholder="Nhập số điện thoại"
            controllerName="phone"
          />

          {/* Password input field */}
          <InputComponent
            label="Mật khẩu"
            isTitle
            hasAsterisk
            placeholder="Nhập mật khẩu"
            controllerName="password"
            useSecureInput={!visible}
            rightIcon={
              <VisibilityIcon visible={visible} toggleVisible={handleToggle} />
            }
          />
          {/* Continue/Submit button */}
          <Button
            mt={4}
            isLoading={isLoading}
            isLoadingText="Đang xử lý"
            onPress={handleSubmit(onSubmit)}
          >
            Tiếp tục
          </Button>
        </VStack>
      </FormProvider>
    </Center>
  );
};

export default ChangePhoneNumberScreen;
