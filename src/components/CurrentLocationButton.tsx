import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Button } from "react-native-paper";

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
      <TouchableOpacity onPress={onPressCurrentLocation}>
        <Image
          style={styles.buttonStyle}
          source={require("../assets/CurrentLocation.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: 50,
    height: 50,
    margin: 1,
    borderRadius: 8
  },
});

export default CurrentLocationButton;
