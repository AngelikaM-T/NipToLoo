import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {

  return (
    <>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
    </>
  );
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#855983",
    background: "transparent",
  },
};
