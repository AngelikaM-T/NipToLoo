import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";

interface RegisterScreenProps {
  navigation: any;
}

export const RegisterScreen = (props: RegisterScreenProps) => {
  const navigation = useNavigation();

  const register = () => props.navigation.navigate("Login");

  return (
    <View style={registerStyle.background}>
    <SafeAreaView >
      <ScrollView>
        <View style={registerStyle.screenContent}>
        <BrandName navigation={navigation}/>
        <View style={registerStyle.registerContent}>
        <View style={registerStyle.card}>
            <Card>
              <Card.Content>
                <Header title="Register" />
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
                <Button
                  onPress={register}
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
    </SafeAreaView>
    </View>
  );
};

const registerStyle = StyleSheet.create({
  background: {
    backgroundColor: "#9ec6cc",
    height: "100%"
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
