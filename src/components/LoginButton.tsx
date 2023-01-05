import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

const LoginButton = (props: { navigation: any }) => {
  const { user } = useContext(UserContext);
  const { navigation } = props;
  const loginScreen = () => navigation.navigate("Login");
  const profileScreen = () => navigation.navigate("Profile");

  return (
    <View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={user.username ? profileScreen : loginScreen}
      >
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
