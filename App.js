import { NavigationContainer } from "@react-navigation/native";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import components from "./src/config/components";
import RootStackNavigator from "./src/navigations/RootStackNavigator";

export default function App() {
  const theme = extendTheme({
    components,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView flex={1}>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
