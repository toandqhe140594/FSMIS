import { NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <LoginScreen />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
