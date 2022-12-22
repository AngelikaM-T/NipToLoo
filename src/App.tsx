import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import AppLoader from "./components/AppLoader";
import { fetchLocations } from "./config/api/api";
import PlaceSearch from "./components/PlaceSearch";
import LocationMarker from "./components/LocationMarker";
import Overlays from "./components/Overlays";
import ToiletMap from "./components/MapView";

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

export default function App() {
  const [toiletLocations, setToiletLocations] = useState<Toilet[]>([]);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [loadingToilets, setLoadingToilets] = useState<boolean>(true);
  const [targetedToilet, setTargetedToilet] = useState(null);
  const [toiletCardVisible, setToiletCardVisible] = useState(false);
  const [reviewCardVisible, setReviewCardVisible] = useState(false);
  const [markerCoords, setMarkerCoords] = useState({});
  const [location, setLocation] = useState<Coords>({
    latitude: 53.483959,
    longitude: -2.244644,
  });

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
          <ToiletMap
            location={location}
            toiletLocations={toiletLocations}
            toiletCardVisible={toiletCardVisible}
            markerCoords={markerCoords}
            setTargetedToilet={setTargetedToilet}
            setToiletCardVisible={setToiletCardVisible}
            setMarkerCoords={setMarkerCoords}
          />
          <LocationMarker location={location} />
          <Overlays
            toiletCardVisible={toiletCardVisible}
            targetedToilet={targetedToilet}
            reviewCardVisible={reviewCardVisible}
            setToiletCardVisible={setToiletCardVisible}
            setReviewCardVisible={setReviewCardVisible}
            location={location}
            toiletLocations={toiletLocations}
            setTargetedToilet={setTargetedToilet}
          />
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
});
