import { Avatar, Box, HStack, Text, VStack } from "native-base";
import PropTypes from "prop-types";
import React from "react";

const AvatarCard = ({
  avatarSize,
  nameUser,
  nameFontSize,
  subText,
  subTextFontSize,
}) => {
  return (
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
      mt={4}
    >
      <HStack space={3} alignItems="center">
        <Avatar
          size={avatarSize}
          source={{
            uri: "https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg",
          }}
        />
        <VStack ml={1}>
          <Text
            _dark={{
              color: "warmGray.50",
            }}
            color="coolGray.800"
            bold
            fontSize={nameFontSize || "md"}
          >
            {nameUser}
          </Text>
          {subText && (
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontSize={subTextFontSize || "md"}
            >
              {subText}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
AvatarCard.propTypes = {
  avatarSize: PropTypes.string,
  nameUser: PropTypes.string,
  nameFontSize: PropTypes.string,
  subText: PropTypes.string,
  subTextFontSize: PropTypes.string,
};
AvatarCard.defaultProps = {
  avatarSize: "md",
  nameUser: "Thanh",
  nameFontSize: "md",
  subText: null,
  subTextFontSize: "sm",
};
export default AvatarCard;
