import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screens/login/LoginScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { ProfileScreen } from "../screens/profile/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={HomeScreen}></Screen>
      <Screen name="Login" component={LoginScreen}></Screen>
      <Screen name="Register" component={RegisterScreen}></Screen>
      <Screen name="Profile" component={ProfileScreen}></Screen>
    </Navigator>
  </NavigationContainer>
);

export default AppNavigator;
