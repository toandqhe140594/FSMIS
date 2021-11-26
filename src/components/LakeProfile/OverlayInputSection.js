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
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: 4,
  },
  input: { width: "65%" },
  text: { fontSize: 16, width: "35%" },
  hint: { fontStyle: "italic", marginBottom: 6, alignSelf: "center" },
});

const OverlayInputSection = ({ id, name, visible, toggleOverlay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { stockFishInLake } = useStoreActions(
    (actions) => actions.FManageModel,
  );
  const methods = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { quantity: 0, weight: 0 },
    resolver: yupResolver(SCHEMA.FMANAGE_LAKE_FISH_EDIT_FORM),
  });
  const { handleSubmit, reset, watch } = methods;
  const watchQuantity = watch("quantity");
  const watchWeight = watch("weight");
  /**
   * To exit overlay, reset any error or previous input by use
   * setIsLoading to false
   * set visible to false to hide overlay
   */
  const handleOnExit = () => {
    reset(
      { quantity: 0, weight: 0 },
      {
        keepErrors: false,
      },
    );
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
        showToastMessage("Bồi cá thành công!");
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
      reset({ quantity: 0 }, { keepErrors: false });
    }
  }, [watchQuantity]);

  /**
   * Reset weight "" to 0
   * Trigger when use deletes the value
   */
  useEffect(() => {
    if (watchWeight === "") {
      reset({ weight: 0 }, { keepErrors: false });
    }
  }, [watchWeight]);

  return (
    <Overlay overlayStyle={styles.overlayContainer} isVisible={visible}>
      <Text style={styles.title}>Bồi cá</Text>
      <Text style={styles.hint}>Lưu ý: Chỉ cần một trong hai trường</Text>
      <FormProvider {...methods}>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Loại cá</Text>
          <Input flexGrow={1} fontSize="md" placeholder={name} isDisabled />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Số cá bồi</Text>
          <InputComponent
            useNumPad
            myStyles={styles.input}
            controllerName="quantity"
            placeholder="Nhập số con muốn bồi"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}>Tổng cân nặng</Text>
          <InputComponent
            useNumPad
            controllerName="weight"
            myStyles={styles.input}
            placeholder="Nhập cân nặng đợt bồi (kg)"
          />
        </View>
        <View
          style={StyleSheet.compose(styles.inputWrapper, {
            marginTop: 20,
            justifyContent: "space-evenly",
          })}
        >
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
