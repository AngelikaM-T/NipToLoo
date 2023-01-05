import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";
import { UserContext } from "./context/userContext";
import { User } from "./context/types";
import { defaultUser } from "./context/defaults";

export default function App() {
  const [user, setUser] = useState<User>(defaultUser);
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
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
