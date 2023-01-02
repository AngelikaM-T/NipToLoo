import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface CurRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const CurrentLocationButton = ({ currentLocation, setLocation }) => {
  const onPressCurrentLocation = () => {
    setLocation(currentLocation);
  };

  return (
    <View>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPressCurrentLocation}>
        <Image
          style={styles.iconStyle}
          source={require("../assets/reset-location.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  iconStyle: {
    width: 50,
    height: 50,
    color: "white",
    borderRadius: 20
  },
});

export default CurrentLocationButton;
