import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { fetchLocations } from "../../config/api/api";
import PlaceSearch from "../../components/PlaceSearch";
import LocationMarker from "../../components/LocationMarker";
import Overlays from "../../components/Overlays";
import ToiletMap from "../../components/ToiletMap";
import AppLoader from "../../components/AppLoader";
import { NavigationContext, useNavigation } from "@react-navigation/native";

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

export const HomeScreen = () => {
  const navigation = useNavigation();

  const [loadingToilets, setLoadingToilets] = useState<boolean>(true);
  const [toiletLocations, setToiletLocations] = useState<Toilet[]>([]);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [userLogin, setUserLogin] = useState<boolean>(false);
  const [targetedToilet, setTargetedToilet] = useState(null);
  const [toiletCardVisible, setToiletCardVisible] = useState(false);
  const [reviewCardVisible, setReviewCardVisible] = useState(false);
  const [markerCoords, setMarkerCoords] = useState({});
  const [location, setLocation] = useState<Coords>({
    latitude: 53.483959,
    longitude: -2.244644,
  });
  const [currentLocation, setCurrentLocation] = useState<Coords>({
    latitude: null,
    longitude: null,
  });

  const stateObj = {
    toiletCardVisible,
    targetedToilet,
    reviewCardVisible,
    setToiletCardVisible,
    setReviewCardVisible,
    location,
    toiletLocations,
    setTargetedToilet,
    markerCoords,
    setMarkerCoords,
    setLocation,
    currentLocation,
  };

  useEffect(() => {
    (async () => {
      let stuff = await Location.requestForegroundPermissionsAsync();
      if (stuff.status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setCurrentLocation(location.coords);
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
      {loadingToilets ? <AppLoader /> : null}
      <View style={styles.container}>
        <ToiletMap stateObj={stateObj} />
        <Overlays stateObj={stateObj} navigation={navigation}/>
        <PlaceSearch stateObj={stateObj} navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
