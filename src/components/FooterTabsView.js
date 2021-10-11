import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Box, Center, HStack, Icon, Pressable, Text } from "native-base";
import PropTypes from "prop-types";
import React, { useState } from "react";

const FooterTabsView = () => {
  const [selected, setSelected] = useState(0);

  const TabElement = ({ IconElement, name, position }) => {
    const color = selected === position ? "red.500" : "black";
    return (
      <Pressable
        cursor="pointer"
        opacity={selected === position ? 1 : 0.5}
        py={2}
        flex={1}
        onPress={() => setSelected(position)}
      >
        <Center>
          <Icon as={IconElement} color={color} size="sm" />
          <Text color={color} fontSize="12">
            {name}
          </Text>
        </Center>
      </Pressable>
    );
  };
  TabElement.propTypes = {
    IconElement: PropTypes.element,
    name: PropTypes.string.isRequired,
    position: PropTypes.number.isRequired,
  };
  TabElement.defaultProps = {
    IconElement: <></>,
  };

  return (
    <Box bg="white">
      <Center flex={1} />
      <HStack bg="white" alignItems="center" safeAreaBottom shadow={6}>
        <TabElement
          IconElement={<MaterialIcons name="location-searching" />}
          name="Điểm câu"
          position={0}
        />
        <TabElement
          IconElement={<MaterialIcons name="bookmark" />}
          name="Đã lưu"
          position={1}
        />
        <TabElement
          IconElement={<MaterialCommunityIcons name="fish" />}
          name="Báo cá"
          position={2}
        />
        <TabElement
          IconElement={<MaterialIcons name="notifications" />}
          name="Thông báo"
          position={3}
        />
        <TabElement
          IconElement={<MaterialIcons name="account-circle" />}
          name="Cá nhân"
          position={4}
        />
      </HStack>
    </Box>
  );
};
export default FooterTabsView;
