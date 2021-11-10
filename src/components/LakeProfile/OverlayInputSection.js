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
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
  },
  input: { width: "65%" },
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
    reValidateMode: "onChange",
    defaultValues: { quantity: 0, weight: 0 },
    resolver: yupResolver(SCHEMA.FISH_EDIT_FORM),
  });
  const { handleSubmit, clearErrors, reset, watch, setError, setValue } =
    methods;
  const watchQuantity = watch("quantity", 0);
  const watchWeight = watch("weight", 0);
  /**
   * To exit overlay, reset any error or previous input by use
   * setIsLoading to false
   * set visible to false to hide overlay
   */
  const handleOnExit = () => {
    reset({ quantity: 0, weight: 0 }); // this reset will not work with select dropdown
    clearErrors(["quantity", "weight"]);
    setIsLoading(false);
    toggleOverlay({ visible: false });
  };

  /**
   * Check if two field is empty
   * Catch user presses submit without inputting
   * @returns bool
   */
  const bothFieldNotEmpty = () => {
    if (watchQuantity === 0 && watchWeight === 0) {
      setError("quantity", {
        type: "required",
        message: "Phải nhập một trong hai trường",
      });
      setError("weight", {
        type: "required",
        message: "Phải nhập một trong hai trường",
      });
      return false;
    }
    return true;
  };

  const onSubmit = (data) => {
    if (bothFieldNotEmpty()) {
      setIsLoading(true);
      const updateData = Object.fromEntries(
        Object.entries(data).filter((keyValPair) => keyValPair[1] !== 0),
      );
      stockFishInLake({ updateData, id, setUpdateStatus });
    }
  };

  /**
   * Reset quantity "" to 0
   * Fire when use deletes the value
   */
  useEffect(() => {
    if (watchQuantity === "") {
      setValue("quantity", 0);
      clearErrors("quantity");
    }
  }, [watchQuantity]);

  /**
   * Reset weight "" to 0
   * Fire when use deletes the value
   */
  useEffect(() => {
    if (watchWeight === "") {
      setValue("weight", 0);
      clearErrors("weight");
    }
  }, [watchWeight]);

  useEffect(() => {
    if (updateStatus === "SUCCESS") {
      setIsLoading(false);
      showToastMessage("Bồi cá thành công!");
      setUpdateStatus(null);
      handleOnExit();
    } else if (updateStatus === "FAILED") {
      setIsLoading(false);
      setUpdateStatus(null);
      handleOnExit();
    }
  }, [updateStatus]);

  return (
    <Overlay overlayStyle={styles.overlayContainer} isVisible={visible}>
      <Text style={styles.title}>Bồi cá</Text>
      <Text style={{ fontStyle: "italic", marginBottom: 4 }}>
        Nhập một trong hai Trường
      </Text>
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
            // shouldDisable={watchWeight.length > 0}
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
            // shouldDisable={watchQuantity.length > 0}
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
