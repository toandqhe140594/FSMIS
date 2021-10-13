import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const ProfileStack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default ProfileNavigator;
