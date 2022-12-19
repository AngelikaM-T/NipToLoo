import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

interface ToiletLocation {
  lat: number;
  lng: number;
}

interface Geometry {
  location: ToiletLocation;
  viewport: object;
}

interface Toilet {
  name: any;
  rating: any;
  geometry: Geometry;
}

interface Coords {
  latitude: number;
  longitude: number;
}

interface MyLocation {
  coords: Coords;
}

export default function App() {
  const [toiletLocations, setToiletLocations] = useState<Toilet[]>([]);
  const [location, setLocation] = useState<Coords | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get<{ results: Toilet[] }>(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${location?.latitude}%2C${location?.longitude}&query=toilet&key=AIzaSyDFKThqSRUAWN85xGITOvRB1RPYm44N4Bc`
        );
        setToiletLocations(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        {toiletLocations.map((location, index) => (
          <Marker
            style={styles.marker}
            key={index}
            coordinate={{
              latitude: location.geometry.location.lat,
              longitude: location.geometry.location.lng,
            }}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    borderWidth: 10,
  },
});
