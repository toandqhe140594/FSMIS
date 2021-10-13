import { NavigationContainer } from "@react-navigation/native";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import components from "./src/config/components";
<<<<<<< HEAD
import AnglerCatchReportsHistory from "./src/screens/CatchReportsHistoryDetail";
=======
import RootStackNavigator from "./src/navigations/RootStackNavigator";
>>>>>>> app-toan

export default function App() {
  const theme = extendTheme({
    components,
  });

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
<<<<<<< HEAD
        {/* <LogoScreen /> */}
        <AnglerCatchReportsHistory />
=======
        <SafeAreaView flex={1}>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </SafeAreaView>
>>>>>>> app-toan
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}
