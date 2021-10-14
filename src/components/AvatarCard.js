import { Avatar, Box, HStack, Text, VStack } from "native-base";
import React from "react";

// eslint-disable-next-line react/prop-types
const AvatarCard = ({ avatarSize, name, nameSize, subText }) => {
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
            fontSize={nameSize || "md"}
          >
            {name}
          </Text>
          {subText && (
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {subText}
            </Text>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
export default AvatarCard;
