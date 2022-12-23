import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";

interface RegisterScreenProps {
  navigation: any;
}


export const RegisterScreen = (props: RegisterScreenProps) => {

  const register = () => props.navigation.navigate("Home");

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Header title="Register" />
          <View style={registerStyle.registerContent}>
            <TextInput label="Name" />
            <TextInput label="Email" keyboardType="email-address" />
            <TextInput
              label="Password"
              secureTextEntry={true}
              right={
                <TextInput.Icon
                  icon="eye"
                  iconColor={registerStyle.icon.color}
                />
              }
            />
            <TextInput
              label="Confirm password"
              secureTextEntry={true}
              right={
                <TextInput.Icon
                  icon="eye"
                  iconColor={registerStyle.icon.color}
                />
              }
            />
            <TextInput label="Phone number" keyboardType="phone-pad" />
            <Button onPress={register} mode="contained" style={registerStyle.button}>
              Register
            </Button>
              <BrandName />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const registerStyle = StyleSheet.create({
  screenContent: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#855983",
  },
  registerContent: {
    padding: 15,
    paddingTop: 0,
  },
  icon: {
    color: "#855983",
  },
  button: {
    margin: 15,
    marginLeft: 0,
    marginRight: 0,
  },
});
