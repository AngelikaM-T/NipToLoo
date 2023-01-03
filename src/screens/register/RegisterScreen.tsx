import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import CustomInput from "../../components/CustomInput";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen = (props: RegisterScreenProps) => {
  const navigation = useNavigation();

  const { control, handleSubmit, watch } = useForm({ mode: "onBlur" });
  const pwd = watch("password");

  const registerNewUser = () => props.navigation.navigate("Login");

  return (
    <View style={registerStyle.background}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView keyboardShouldPersistTaps={"handled"}>
            <View style={registerStyle.screenContent}>
              <BrandName navigation={navigation} />
              <View style={registerStyle.registerContent}>
                <View style={registerStyle.card}>
                  <Card>
                    <Card.Content>
                      <Header title="Register" />
                      <CustomInput
                        name="name"
                        placeholder="Name"
                        control={control}
                        rules={{
                          required: "Name is required",
                          pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Invalid name",
                          },
                        }}
                      />
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
                            message:
                              "Password should be minimum 8 characters long",
                          },
                          pattern: {
                            value:
                              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                            message:
                              "Password must contain at least one number and one special character",
                          },
                        }}
                      />
                      <CustomInput
                        name="confirm_password"
                        placeholder="Confirm password"
                        control={control}
                        rules={{
                          validate: (value) =>
                            value === pwd || "Passwords do not match",
                        }}
                      />
                      <Button
                        onPress={handleSubmit(registerNewUser)}
                        mode="contained"
                        style={registerStyle.button}
                      >
                        Register
                      </Button>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const registerStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    backgroundColor: "#9ec6cc",
    height: "100%",
  },
  screenContent: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    width: "90%",
    height: "100%",
    margin: 5,
  },
  registerContent: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    color: "#005691",
  },
  button: {
    margin: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});
