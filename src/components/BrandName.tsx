import React from "react";
import { Appbar } from "react-native-paper";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const BrandName = ({ navigation, stateObj = null }) => {
  const goHome = () => {
    if (stateObj) {
      stateObj.setToiletCardVisible(false);
      stateObj.setReviewCardVisible(false);
    }

    navigation.navigate("Home");
  };

  return (
    <View style={brandStyle.imageContainer}>
      <TouchableOpacity onPress={goHome}>
        <Image
          style={brandStyle.img}
          source={require("../assets/logo-5.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const brandStyle = StyleSheet.create({
  imageContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: "10%",
    paddingRight: "10%",
    width: "100%",
  },
  img: {
    flex: 1,
    width: 300,
    height: 300,
    resizeMode: "cover",
    borderRadius: 100,
  },
});
