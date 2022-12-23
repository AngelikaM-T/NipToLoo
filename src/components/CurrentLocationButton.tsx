import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { Button } from "react-native-paper";


interface CurRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const CurrentLocationButton = ({currentLocation, setLocation}) => {

      const onPressCurrentLocation = () => {
        setLocation(currentLocation);
      };

      return (
        <View>
            <Button onPress={onPressCurrentLocation} mode="contained">
              R
            </Button>

        </View>
      )
};

export default CurrentLocationButton;