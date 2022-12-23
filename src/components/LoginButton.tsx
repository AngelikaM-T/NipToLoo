import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from 'react';

const LoginButton = (props: { navigation: any }) => {
  const { navigation } = props;
  const loginScreen = () => navigation.navigate("Login");

  return (
    <View>
      <TouchableOpacity  onPress={loginScreen}>
        <Image 
        style={styles.buttonStyle}
        source={require('../assets/userIcon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
buttonStyle: {
  width: 50,
  height: 50
}
})

export default LoginButton;
