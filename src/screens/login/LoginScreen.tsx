import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen = (props: LoginScreenProps) => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm();

  const login = () => props.navigation.navigate("Home");

  const registerPage = () => props.navigation.navigate("Register");

  return (
    <>
      <SafeAreaView style={loginStyle.screenContent}>
        <BrandName navigation={navigation} />
        <View style={loginStyle.loginContent}>
          <View style={loginStyle.card}>
            <Card>
              <Card.Content>
                <Header title="Log in" />
                <CustomInput
                  name="username"
                  placeholder="Username"
                  control={control}
                  secureTextEntry
                  rules={{
                    required: "Username is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />

                <CustomInput
                  name="password"
                  placeholder="Password"
                  control={control}
                  secureTextEntry
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password should be minimum 8 characters long",
                    },
                  }}
                />
                <Button uppercase={false} style={loginStyle.cardButton}>
                  Forgot email/password
                </Button>
                <Button
                  onPress={handleSubmit(login)}
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
