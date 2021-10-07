import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import components from "./src/config/components";
import LogoScreen from "./src/screens/LogoScreen";

export default function App() {
  const theme = extendTheme({
    components,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <LogoScreen />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
