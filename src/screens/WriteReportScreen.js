import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const ReportScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 40,
          backgroundColor: "white",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 4 }}>
            Báo cáo vi phạm
          </Text>
        </View>
        <Ionicons name="flag" size={24} color="#fff" />
      </View>
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
    </SafeAreaView>
  );
};

export default ReportScreen;
