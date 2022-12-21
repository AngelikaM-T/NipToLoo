import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import AppLoader from "./components/AppLoader";
import { fetchLocations } from "./config/api/api";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { LoginScreen } from "./screens/login/login.screen";
import { RegisterScreen } from "./screens/register/register.screen";
import AppNavigator from "./navigation/AppNavigator";

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
  const [userLogin, setUserLogin] = useState<boolean>(true);

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
      ) : userLogin ? (
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
      ) : (
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
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

export const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      primary: "#855983",
      background: "transparent"
  }
}
