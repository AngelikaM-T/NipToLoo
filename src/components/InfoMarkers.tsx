import React from "react";
import { Text, View } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { postToilet } from "../config/api/api";

const InfoMarker = ({
  location,
  toiletLocations,
  toiletCardVisible,
  markerCoords,
  setTargetedToilet,
  setToiletCardVisible,
  setMarkerCoords,
}) => {
  const markerHandler = (coords = null) => {
    postToilet(location);
    setMarkerCoords(coords);
  };

  const toggleToiletCard = (coords = null) => {
    setToiletCardVisible(!toiletCardVisible);

    let matchingToilet;

    if (toiletCardVisible === false) {
      for (let i = 0; i < toiletLocations.length; i++) {
        if (
          coords.longitude === toiletLocations[i].geometry.location.lng &&
          coords.latitude === toiletLocations[i].geometry.location.lat
        ) {
          matchingToilet = toiletLocations[i];
        }
      }
      setTargetedToilet(matchingToilet);
    }
  };

  return (
    <Marker
      coordinate={{
        latitude: location ? location.geometry.location.lat! : 0,
        longitude: location ? location.geometry.location.lng! : 0,
      }}
      onPress={(e) => {
        markerHandler(e.nativeEvent.coordinate);
      }}
      pinColor="#590074"
    >
      <Callout
        onPress={() => {
          toggleToiletCard(markerCoords);
        }}
      >
        <View>
          <Text>{location.name}</Text>
          <Text>Press here for more details</Text>
        </View>
      </Callout>
    </Marker>
  );
};

export default InfoMarker;
