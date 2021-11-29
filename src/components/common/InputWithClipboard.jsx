import { FontAwesome5 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Pressable } from "react-native";

import InputComponent from "./InputComponent";

const ClipboardIcon = ({ handlePress }) => (
  <Pressable style={{ marginHorizontal: 12 }} onPress={handlePress}>
    <FontAwesome5 name="clipboard" size={24} color="black" />
  </Pressable>
);

const InputWithClipboard = ({
  label,
  isTitle,
  placeholder,
  controllerName,
}) => {
  const { setValue } = useFormContext();
  const pasteData = async () => {
    const data = await Clipboard.getStringAsync();
    if (data) setValue(controllerName, data);
  };
  return (
    <InputComponent
      isTitle={isTitle}
      label={label}
      placeholder={placeholder}
      controllerName={controllerName}
      rightIcon={<ClipboardIcon handlePress={pasteData} />}
    />
  );
};

ClipboardIcon.propTypes = { handlePress: PropTypes.func.isRequired };
InputWithClipboard.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
  isTitle: PropTypes.bool,
};
InputWithClipboard.defaultProps = {
  label: "",
  isTitle: false,
  placeholder: "",
  controllerName: "",
};

export default InputWithClipboard;
