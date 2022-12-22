import React from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen = (props: LoginScreenProps) => {

    const login = () => props.navigation.navigate("App");

  return (
    <>
      <SafeAreaView style={loginStyle.screenContent}>
        <View style={loginStyle.loginContent}>
        <View style={loginStyle.view}>
          <Card>
            <Card.Content>
              <Header title="Log in" />
              <TextInput label="Email" keyboardType="email-address"></TextInput>
              <TextInput label="Password" secureTextEntry={true}></TextInput>
              <Button uppercase={false} style={loginStyle.cardButton}>
                Forgot email/password
              </Button>
              <Button onPress={login } mode="contained" style={loginStyle.cardButton}>
                Log in
              </Button>
              <Button style={loginStyle.cardButton}>Register</Button>
            </Card.Content>
          </Card>
        </View>
        </View>
        <BrandName />
      </SafeAreaView>
    </>
  );
};


const loginStyle = StyleSheet.create({
screenContent: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#855983",
},
  loginContent: {
    display: "flex",
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  view: {
    width: "80%",
  },
  cardButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
});
