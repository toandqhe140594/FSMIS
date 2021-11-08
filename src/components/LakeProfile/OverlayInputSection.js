import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreActions } from "easy-peasy";
import { Button, Input } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";

import { SCHEMA } from "../../constants";
import { showToastMessage } from "../../utilities";
import InputComponent from "../common/InputComponent";

const styles = StyleSheet.create({
  overlayContainer: {
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
  },
  input: { flexGrow: 1 },
  text: { fontSize: 16, width: "35%" },
});

const OverlayInputSection = ({ id, name, visible, toggleOverlay }) => {
  const [updateStatus, setUpdateStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { stockFishInLake } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(SCHEMA.FISH_EDIT_FORM),
  });
  const { handleSubmit, clearErrors, reset } = methods;
  /**
   * To exit overlay, reset any error or previous input by use
   * setIsLoading to false
   * set visible to false to hide overlay
   */
  const handleOnExit = () => {
    reset({ quantity: "", weight: "" }); // this reset will not work with select dropdown
    clearErrors(["quantity", "weight"]);
    setIsLoading(false);
    toggleOverlay({ visible: false });
  };
  const onSubmit = (data) => {
    setIsLoading(true);
    stockFishInLake({ ...data, id, setUpdateStatus });
  };
  useEffect(() => {
    if (updateStatus === "SUCESS") {
      setIsLoading(false);
      showToastMessage("Bồi cá thành công!");
    } else if (updateStatus === "FAILED") {
      setIsLoading(false);
      showToastMessage("Đã có lỗi xảy ra! Vui lòng thử lại.");
    }
  }, [updateStatus]);
  return (
    <Overlay
      overlayStyle={styles.overlayContainer}
      isVisible={visible}
      onBackdropPress={handleOnExit}
    >
      <Text style={styles.title}>Bồi cá</Text>
      <FormProvider {...methods}>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Loại cá</Text>
          <Input flexGrow={1} fontSize="md" placeholder={name} isDisabled />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Số cá bồi</Text>
          <InputComponent
            myStyles={styles.input}
            label=""
            placeholder="Nhập số con muốn bồi"
            controllerName="quantity"
            useNumPad
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Tổng cân nặng</Text>
          <InputComponent
            myStyles={styles.input}
            label=""
            placeholder="Nhập cân nặng đợt bồi (kg)"
            controllerName="weight"
            useNumPad
          />
        </View>
        <View
          style={[
            styles.inputWrapper,
            { marginTop: 20, justifyContent: "space-evenly" },
          ]}
        >
          <Button w="45%" variant="outline" onPress={handleOnExit}>
            Hủy
          </Button>
          <Button
            w="45%"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
        </View>
      </FormProvider>
    </Overlay>
  );
};

OverlayInputSection.propTypes = {
  visible: PropTypes.bool,
  id: PropTypes.number,
  name: PropTypes.string,
  toggleOverlay: PropTypes.func,
};

OverlayInputSection.defaultProps = {
  id: 0,
  name: "",
  visible: false,
  toggleOverlay: () => {},
};

export default OverlayInputSection;
