import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation();

  const login = () => props.navigation.navigate("Home");

  const registerPage = () => props.navigation.navigate("Register");

  return (
    <>
      <SafeAreaView style={loginStyle.screenContent}>
        <BrandName navigation={navigation}/>
        <View style={loginStyle.loginContent}>
          <View style={loginStyle.card}>
            <Card>
              <Card.Content>
                <Header title="Log in" />
                <TextInput
                  label="Email"
                  keyboardType="email-address"
                ></TextInput>
                <TextInput label="Password" secureTextEntry={true}></TextInput>
                <Button uppercase={false} style={loginStyle.cardButton}>
                  Forgot email/password
                </Button>
                <Button
                  onPress={login}
                  mode="contained"
                  style={loginStyle.cardButton}
                >
                  Log in
                </Button>
                <Button onPress={registerPage} style={loginStyle.cardButton}>
                  Register
                </Button>
              </Card.Content>
            </Card>
          </View>
        </View>
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
    backgroundColor: "#9ec6cc",
  },
  loginContent: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    width: "90%",
    height: "100%",
  },
  cardButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
});
