import React from "react";
import { Appbar } from "react-native-paper";
import { Text, View, StyleSheet} from "react-native";

export const BrandName = () => {
  return (
    <View style={brandStyle.content}>
      <Text style={brandStyle.text}>Nip t' Loo</Text>
      </View>

  );
};


const brandStyle = StyleSheet.create({
    content: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#e37b74",
        borderRadius: 30,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 0,
        paddingTop: 0,
        marginBottom: 50
    },
    text: {
        fontSize: 30,
      color: "#ecdad0",
    }
  });