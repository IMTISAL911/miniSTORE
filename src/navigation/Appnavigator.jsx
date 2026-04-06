import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./Authnavigator"; // import only

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;