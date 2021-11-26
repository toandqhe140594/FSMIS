import { useStoreActions } from "easy-peasy";
import { Box, Button, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Card, Overlay } from "react-native-elements";

import { showAlertConfirmBox } from "../utilities";
import PressableCustomCard from "./PressableCustomCard";

const BlacklistPhoneCard = ({ phone, description, image }) => {
  const [loading, setLoading] = useState(false);

  const whitelistPhoneNumber = useStoreActions(
    (actions) => actions.AccountManagementModel.whitelistPhoneNumber,
  );
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const OverlayInformation = () => {
    return (
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          width: "90%",
        }}
      >
        <Card containerStyle={{ margin: 0 }}>
          <Card.Title>{phone}</Card.Title>
          <Card.Divider />
          {image ? (
            <Card.Image source={{ uri: image }} resizeMode="contain" />
          ) : (
            <></>
          )}
          <Text>{description}</Text>
        </Card>
      </Overlay>
    );
  };

  const showDetailInformation = () => {
    // If the phone in blacklist has description aka reason
    if (description)
      // Show an overlay that show detail of the description
      toggleOverlay();
  };

  const whitelistPhoneFunction = () => {
    setLoading(true);
    whitelistPhoneNumber({ phone }).catch(() => {
      setLoading(false);
    });
  };

  const deletePhoneNumberButtonAction = () => {
    showAlertConfirmBox(
      "Xóa số điện thoại khỏi danh sách đen?",
      `Bạn có muốn xóa "${phone}" khỏi danh sách đen không?\nSố điện thoại này sẽ được tham gia vào các hoạt động trên ứng dụng bình thường trở lại!`,
      whitelistPhoneFunction,
    );
  };

  return (
    <>
      <OverlayInformation />
      <PressableCustomCard onPress={showDetailInformation}>
        <Box py={2} px={3} flex={1} flexDir="row">
          <Box flex={2} justifyContent="center">
            <Text bold fontSize="lg">
              {phone}
            </Text>
            {description ? (
              <Text flex={1} isTruncated numberOfLines={1}>
                {description}{" "}
              </Text>
            ) : (
              <></>
            )}
          </Box>
          <Box justifyContent="center">
            <Button
              onPress={deletePhoneNumberButtonAction}
              isLoading={loading}
              isDisabled={loading}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </PressableCustomCard>
    </>
  );
};
BlacklistPhoneCard.propTypes = {
  phone: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
};
BlacklistPhoneCard.defaultProps = {
  description: "",
  image: "",
};

export default BlacklistPhoneCard;
