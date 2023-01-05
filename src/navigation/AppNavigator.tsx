import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { LoginScreen } from "../screens/login/LoginScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { Profile } from "../screens/profile/Profile";

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
      <Screen name="Profile" component={Profile}></Screen>
    </Navigator>
  </NavigationContainer>
);

export default AppNavigator;
