import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { UserProvider } from "./context/UserProvider";
import AppNavigator from "./navigation/AppNavigator";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <>
      <UserProvider>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </UserProvider>
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
