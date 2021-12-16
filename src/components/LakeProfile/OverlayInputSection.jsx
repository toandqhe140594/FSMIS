import { yupResolver } from "@hookform/resolvers/yup";
import { useStoreActions } from "easy-peasy";
import { Button, Input } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Overlay } from "react-native-elements";

import { DICTIONARY, SCHEMA } from "../../constants";
import { showToastMessage } from "../../utilities";
import InputComponent from "../common/InputComponent";

const styles = StyleSheet.create({
  overlayContainer: {
    width: "90%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  input: { width: "65%" },
  text: { fontSize: 16, width: "35%" },
  hint: { fontStyle: "italic", marginVertical: 6, alignSelf: "center" },
});

const RESET_VALUE = 0;

const OverlayInputSection = ({ id, name, visible, toggleOverlay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { stockFishInLake } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: { quantity: 0, weight: 0 },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FISH_EDIT_FORM),
  });
  const { handleSubmit, reset, watch, setValue } = methods;
  const watchQuantity = watch(DICTIONARY.FORM_FIELD_FISH_QUANTITY);
  const watchWeight = watch(DICTIONARY.FORM_FIELD_FISH_STOCKING_WEIGHT);
  /**
   * To exit overlay, reset any error or previous input by use
   * setIsLoading to false
   * set visible to false to hide overlay
   */
  const handleOnExit = () => {
    reset({ quantity: 0, weight: 0 }, { keepErrors: false });
    setIsLoading(false);
    toggleOverlay({ visible: false });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    const updateData = Object.fromEntries(
      Object.entries(data).filter((keyValPair) => keyValPair[1] !== 0),
    );
    stockFishInLake({ id, updateData })
      .then(() => {
        showToastMessage(DICTIONARY.ALERT_LAKE_STOCKING_SUCCESS_MSG);
        handleOnExit();
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  /**
   * Reset quantity "" to 0
   * Trigger when use deletes the value
   */
  useEffect(() => {
    if (watchQuantity === "") {
      setValue(DICTIONARY.FORM_FIELD_FISH_QUANTITY, RESET_VALUE);
    }
  }, [watchQuantity]);

  /**
   * Reset weight "" to 0
   * Trigger when use deletes the value
   */
  useEffect(() => {
    if (watchWeight === "") {
      setValue(DICTIONARY.FORM_FIELD_FISH_STOCKING_WEIGHT, RESET_VALUE);
    }
  }, [watchWeight]);

  return (
    <Overlay overlayStyle={styles.overlayContainer} isVisible={visible}>
      <Text style={styles.title}>Bồi cá</Text>
      <FormProvider {...methods}>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Loại cá</Text>
          <Input flexGrow={1} fontSize="md" placeholder={name} isDisabled />
        </View>
        <Text style={styles.hint}>Lưu ý: Chỉ cần một trong hai trường</Text>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Số cá bồi</Text>
          <InputComponent
            useNumPad
            myStyles={styles.input}
            controllerName={DICTIONARY.FORM_FIELD_FISH_QUANTITY}
            placeholder={DICTIONARY.INPUT_FISH_STOCKING_QUANTITY_PLACEHOLDER}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Tổng cân nặng</Text>
          <InputComponent
            useNumPad
            controllerName={DICTIONARY.FORM_FIELD_FISH_STOCKING_WEIGHT}
            myStyles={styles.input}
            placeholder={DICTIONARY.INPUT_FISH_STOCKING_WEIGHT_PLACEHOLDER}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button w="45%" variant="outline" onPress={handleOnExit}>
            Quay lại
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
