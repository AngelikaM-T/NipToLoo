import React, { useState } from "react";
import { Text, View, Linking } from "react-native";
import { Marker, Callout } from "react-native-maps";

interface ToiletLocation {
  lat: number;
  lng: number;
}

interface Geometry {
  location: ToiletLocation;
  viewport: object;
}

interface Toilet {
  photos?: any;
  name: any;
  rating: any;
  geometry: Geometry;
}

interface Coords {
  latitude: number;
  longitude: number;
}

const InfoMarker = ({
  location,
  toiletLocations,
  index,
  targetedToilet,
  toiletCardVisible,
  reviewCardVisible,
  markerCoords,
  setTargetedToilet,
  setToiletCardVisible,
  setReviewCardVisible,
  setMarkerCoords,
}) => {
  const markerHandler = (coords = null) => {
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
      key={index}
      coordinate={{
        latitude: location ? location.geometry.location.lat! : 0,
        longitude: location ? location.geometry.location.lng! : 0,
      }}
      onPress={(e) => {
        markerHandler(e.nativeEvent.coordinate);
      }}
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
