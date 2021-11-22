import PropTypes from "prop-types";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Avatar } from "react-native-elements";

import { ROUTE_NAMES } from "../../constants";
import { goToMediaSelectScreen } from "../../navigations";

const AvatarSection = ({ containerStyle, navigation, name, handleDelete }) => {
  const { control } = useFormContext();
  const avatarUrl = useWatch({ control, name, defaultValue: "" });
  return (
    <Avatar
      containerStyle={containerStyle}
      size={130}
      rounded
      source={{
        uri: avatarUrl,
      }}
      onLongPress={handleDelete}
      onPress={() =>
        goToMediaSelectScreen(navigation, {
          returnRoute: ROUTE_NAMES.PROFILE_CHANGE_INFORMATION,
          maxSelectable: 1,
        })
      }
    />
  );
};

AvatarSection.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.func),
  handleDelete: PropTypes.func,
  containerStyle: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  name: PropTypes.string,
};

AvatarSection.defaultProps = {
  navigation: {},
  handleDelete: () => {},
  containerStyle: {},
  name: "",
};

export default AvatarSection;
