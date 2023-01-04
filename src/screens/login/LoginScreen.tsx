import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { getUsers } from "../../config/api/api";
import { UserContext } from "../../context/UserContext";

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen = (props: LoginScreenProps) => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const { login } = useContext(UserContext);

  const { control, handleSubmit, getValues } = useForm({ mode: "onBlur" });

  useEffect(() => {
    getUsers().then((retreivedUsers) => {
      setUsers(retreivedUsers);
    });
  }, []);

  const logInUser = () => {
    const values = getValues();
    const email = values.email
    // login()
    const loggedInUser = users.find(user => user.email === email)
    const username = loggedInUser.username
    login(username, email);
    props.navigation.goBack();
  };

  

  const registerPage = () => props.navigation.navigate("Register");

  return (
    <>
      <SafeAreaView style={loginStyle.screenContent}>
        <KeyboardAvoidingView behavior="padding">
          <BrandName navigation={navigation} />
          <View style={loginStyle.loginContent}>
            <View style={loginStyle.card}>
              <Card>
                <Card.Content>
                  <Header title="Log in" />
                  <CustomInput
                    name="email"
                    placeholder="Email"
                    control={control}
                    rules={{
                      required: "Email is required",
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
                    onPress={handleSubmit(logInUser)}
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
        </KeyboardAvoidingView>
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
