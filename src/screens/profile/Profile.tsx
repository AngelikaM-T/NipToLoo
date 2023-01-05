import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { Image } from "react-native";
import { BrandName } from "../../components/BrandName";
import { Header } from "../../components/Header";
import { UserContext } from "../../context/userContext";
import { defaultUser } from "../../context/defaults";
const defaultAvatar = require("../../assets/default-avatar-1.png");

interface LoginScreenProps {
  navigation: any;
}

export const Profile = (props: LoginScreenProps) => {
  const { user, setUser } = useContext(UserContext);
  if (!user.avatar_url) {
    user.avatar_url;
  }

  const logoutHandler = () => {
    setUser(defaultUser);
    props.navigation.navigate("Home");
  };

  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={loginStyle.screenContent}>
        <KeyboardAvoidingView behavior="padding">
          <BrandName navigation={navigation} />
          <View style={loginStyle.loginContent}>
            <View style={loginStyle.card}>
              <Card>
                <Card.Content>
                  <View>
                    <Card>
                      <Header title="" />
                      <Card.Content style={loginStyle.profileCard}>
                        <Title style={loginStyle.title}>{user.username}</Title>
                        <Image
                          source={defaultAvatar}
                          style={loginStyle.image}
                        />
                      </Card.Content>
                    </Card>
                  </View>
                  <Button
                    mode="contained"
                    style={loginStyle.cardButton}
                    onPress={logoutHandler}
                  >
                    Log Out
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
  image: {
    width: 200,
    height: 200,
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
  },
  title: { fontSize: 40, paddingTop: 25 },
  loginContent: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cardButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
  container: {
    backgroundColor: "#9ec6cc",
    borderColor: "#9ec6cc",
    borderWidth: 2,
    borderRadius: 20,
    width: "80%",
    height: "55%",
  },
  reviews: {
    backgroundColor: "#9ec6cc",
    borderColor: "#9ec6cc",
    borderWidth: 2,
    borderRadius: 20,
    width: "90%",
    height: "80%",
    zIndex: 10,
  },
  overlayContent: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    width: "95%",
    height: "100%",
    margin: 5,
  },
  loginButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
