import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "easy-peasy";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import components from "./src/config/components";
import RootStackNavigator from "./src/navigations/RootStackNavigator";
import store from "./src/utilities/Store";

export default function App() {
  const theme = extendTheme({
    components,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView flex={1}>
          <NavigationContainer>
            <StoreProvider store={store}>
              <RootStackNavigator />
            </StoreProvider>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
