import { useStoreActions } from "easy-peasy";
import { Box, Button, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import {
  showAlertBox,
  showAlertConfirmBox,
  showToastMessage,
} from "../utilities";
import PressableCustomCard from "./PressableCustomCard";

const BlacklistPhoneCard = ({ phone, description }) => {
  const [success, setSuccess] = useState(null);

  const whitelistPhoneNumber = useStoreActions(
    (actions) => actions.AccountManagementModel.whitelistPhoneNumber,
  );

  const showDetailInformation = () => {
    // If the phone in blacklist has description aka reason
    if (description)
      // Show an alert box that show detail of the description
      showAlertBox(
        `Số điện thoại: ${phone}`,
        `Lý do bị đưa vào danh sách đen:\n${description}`,
        "Đóng",
      );
  };

  const whitelistPhoneFunction = () => {
    whitelistPhoneNumber({ phone, setSuccess });
  };

  const deletePhoneNumberButtonAction = () => {
    showAlertConfirmBox(
      "Xóa số điện thoại khỏi danh sách đen?",
      `Bạn có muốn xóa "${phone}" khỏi danh sách đen không?\nSố điện thoại này sẽ được tham gia vào các hoạt động trên ứng dụng bình thường trở lại!`,
      whitelistPhoneFunction,
    );
  };

  useEffect(() => {
    if (success)
      showToastMessage(`Số điện thoại ${phone} đã được xóa khỏi danh sách đen`);
    setSuccess(null);
  }, [success]);

  return (
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
          <Button onPress={deletePhoneNumberButtonAction}>Xóa</Button>
        </Box>
      </Box>
    </PressableCustomCard>
  );
};
BlacklistPhoneCard.propTypes = {
  phone: PropTypes.string.isRequired,
  description: PropTypes.string,
};
BlacklistPhoneCard.defaultProps = {
  description: "",
};

export default BlacklistPhoneCard;
