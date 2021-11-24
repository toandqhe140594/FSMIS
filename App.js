import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "easy-peasy";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import colors from "./src/config/colors";
import components from "./src/config/components";
import AuthenticationContainer from "./src/utilities/AuthenticationContainer";
import store from "./src/utilities/Store";

export default function App() {
  const theme = extendTheme({
    colors,
    components,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView flex={1}>
          <NavigationContainer>
            <StoreProvider store={store}>
              <AuthenticationContainer />
            </StoreProvider>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
