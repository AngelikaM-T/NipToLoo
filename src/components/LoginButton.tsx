import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

const LoginButton = (props: { navigation: any }) => {
  const { navigation } = props;
  const loginScreen = () => navigation.navigate("Login");

  return (
    <View>
      <TouchableOpacity style={styles.buttonStyle} onPress={loginScreen}>
        <Image
          style={styles.iconStyle}
          source={require("../assets/userIcon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  iconStyle: {
    width: 40,
    height: 40,
  },
});

export default LoginButton;
