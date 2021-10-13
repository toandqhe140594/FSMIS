import React from "react";
import { Text, TextInput, View } from "react-native";
import { Button, Divider } from "react-native-elements";

import HeaderTab from "../components/HeaderTab";

const ReportScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <HeaderTab name="Báo cáo vi phạm" />
      <Divider />
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={{ marginHorizontal: "10%", marginTop: "5%" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            Bạn có thể miêu tả rõ được không?
          </Text>
          <TextInput
            multiline
            numberOfLines={6}
            maxLength={1000}
            placeholder="Chia sẻ về trải nghiệm của bạn"
            style={{
              borderWidth: 1,
              textAlignVertical: "top",
              padding: 5,
            }}
          />
        </View>
        <Button containerStyle={{ margin: "10%" }} title="Báo cáo" />
      </View>
    </View>
  );
};

export default ReportScreen;
