import { Button, Divider, ScrollView } from "native-base";
import React from "react";
import { Text, View } from "react-native";

// eslint-disable-next-line react/prop-types
const MenuScreen = ({ menuListItem }) => {
  return (
    <ScrollView>
      {menuListItem.map((item) => (
        <View key={item.key}>
          <Button
            size="md"
            variant="ghost"
            pl="4"
            style={{ justifyContent: "flex-start", borderRadius: 0 }}
            colorScheme="light"
          >
            <Text>{item.text}</Text>
          </Button>
          <Divider />
        </View>
      ))}
    </ScrollView>
  );
};
export default MenuScreen;
