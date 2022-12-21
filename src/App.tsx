import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import AppLoader from "./components/AppLoader";
import { fetchLocations } from "./config/api/api";
import PlaceSearch from "./components/PlaceSearch";

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

export default function App() {
  const [toiletLocations, setToiletLocations] = useState<Toilet[]>([]);
  const [location, setLocation] = useState<Coords | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [loadingToilets, setLoadingToilets] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let stuff = await Location.requestForegroundPermissionsAsync();
      if (stuff.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    setLoadingToilets(true);
    fetchLocations(location).then((retreivedToilets) => {
      setToiletLocations(retreivedToilets!);
      setLoadingToilets(false);
    });
  }, [location]);

  return (
    <>
      {loadingToilets ? (
        <AppLoader />
      ) : (
        <View style={styles.container}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={{
              latitude: location?.latitude!,
              longitude: location?.longitude!,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
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
            <Marker
              coordinate={{
                latitude: location?.latitude!,
                longitude: location?.longitude!,
              }}
              pinColor="blue"
            />
            <Circle
              center={{
                latitude: location?.latitude!,
                longitude: location?.longitude!,
              }}
              radius={800}
              strokeWidth={2}
              strokeColor="rgba(45, 33, 202, 0.1)"
              fillColor="rgba(45, 33, 202, 0.1)"
            />
          </MapView>
          <PlaceSearch setLocation={setLocation} />
        </View>
      )}
    </>
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
