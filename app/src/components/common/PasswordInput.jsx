import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Pressable } from "react-native";

import InputComponent from "./InputComponent";

const VisibilityIcon = ({ visible, toggleVisible }) => (
  <Pressable hitSlop={5} onPress={toggleVisible}>
    <Icon
      color="muted.500"
      as={<MaterialIcons name={visible ? "visibility" : "visibility-off"} />}
      size={6}
      mx={2}
    />
  </Pressable>
);

const PasswordInput = ({
  label,
  isTitle,
  myStyles,
  hasAsterisk,
  placeholder,
  controllerName,
}) => {
  const [visible, setVisible] = useState(false);
  /**
   * Toggle password field visibility
   */
  const handleToggle = () => {
    setVisible(!visible);
  };
  return (
    <InputComponent
      myStyles={myStyles}
      label={label}
      isTitle={isTitle}
      hasAsterisk={hasAsterisk}
      placeholder={placeholder}
      controllerName={controllerName}
      useSecureInput={!visible}
      rightIcon={
        <VisibilityIcon visible={visible} toggleVisible={handleToggle} />
      }
    />
  );
};

VisibilityIcon.propTypes = {
  visible: PropTypes.bool,
  toggleVisible: PropTypes.func,
};

VisibilityIcon.defaultProps = {
  visible: false,
  toggleVisible: () => {},
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  isTitle: PropTypes.bool,
  myStyles: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  hasAsterisk: PropTypes.bool,
  placeholder: PropTypes.string,
  controllerName: PropTypes.string,
};

PasswordInput.defaultProps = {
  label: "",
  myStyles: {},
  isTitle: false,
  hasAsterisk: false,
  placeholder: "",
  controllerName: "",
};

export default PasswordInput;
