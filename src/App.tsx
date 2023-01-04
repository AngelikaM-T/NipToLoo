import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import UserContext from "./context/UserContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
  }


  return (
    <>
      <UserContext.Provider value={{ isLoggedIn, login, logout }}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </UserContext.Provider>
    </>
  );
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3d90ad",
    background: "transparent",
  },
};
