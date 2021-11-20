import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Center, Icon, VStack } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, useWindowDimensions } from "react-native";

import InputComponent from "../components/common/InputComponent";
import HeaderTab from "../components/HeaderTab";
import { ROUTE_NAMES, SCHEMA } from "../constants";

const VisibilityIcon = ({ visible, toggleVisible }) => (
  <Pressable onPress={toggleVisible}>
    <Icon
      alignSelf="flex-end"
      color="muted.500"
      as={<MaterialIcons name={visible ? "visibility-off" : "visibility"} />}
      size={6}
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
  const [visible, setVisible] = useState(false);
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SCHEMA.CHANGE_PHONE_NUMBER_FORM),
  });
  const { handleSubmit } = methods;
  const handleToggle = () => {
    setVisible(!visible);
  };
  const onSubmit = (data) => {
    console.log(data);
  };
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
            placeholder="Nhập số điện thoại"
            controllerName="phone"
          />

          {/* Password input field */}
          <InputComponent
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            controllerName="password"
            useSecureInput={visible}
            rightIcon={
              <VisibilityIcon visible={visible} toggleVisible={handleToggle} />
            }
          />
          {/* Continue/Submit button */}
          <Button mt={4} onPress={handleSubmit(onSubmit)}>
            Tiếp tục
          </Button>
        </VStack>
      </FormProvider>
    </Center>
  );
};

export default ChangePhoneNumberScreen;
