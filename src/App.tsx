import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Button, Icon, Overlay } from "@rneui/base";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
  CalloutSubview,
} from "react-native-maps";
import * as Location from "expo-location";
import AppLoader from "./components/AppLoader";
import { fetchLocations } from "./config/api/api";
import PlaceSearch from "./components/PlaceSearch";
import InfoMarker from "./components/InfoMarkers";

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
  const [location, setLocation] = useState<Coords>({
    latitude: 53.483959,
    longitude: -2.244644,
  });
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [loadingToilets, setLoadingToilets] = useState<boolean>(true);
  const [targetedToilet, setTargetedToilet] = useState(null);
  const [toiletCardVisible, setToiletCardVisible] = useState(false);
  const [reviewCardVisible, setReviewCardVisible] = useState(false);
  const [markerCoords, setMarkerCoords] = useState({});

  const toggleReviewCard = () => {
    setToiletCardVisible(!toiletCardVisible);
    setReviewCardVisible(!reviewCardVisible);
    console.log(reviewCardVisible);
  };

  const getWalkingDirections = () => {
    let origin = String(location.latitude) + "%2C" + String(location.longitude);
    let destination =
      String(targetedToilet.geometry.location.lat) +
      "%2C" +
      String(targetedToilet.geometry.location.lng);
    const queryString = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;

    return Linking.openURL(queryString);
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
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.056866,
              longitudeDelta: 0.054757,
            }}
          >
            {toiletLocations.map((location, index) => (
              <InfoMarker
                location={location}
                toiletLocations={toiletLocations}
                index={index}
                targetedToilet={targetedToilet}
                toiletCardVisible={toiletCardVisible}
                reviewCardVisible={reviewCardVisible}
                markerCoords={markerCoords}
                setTargetedToilet={setTargetedToilet}
                setToiletCardVisible={setToiletCardVisible}
                setReviewCardVisible={setReviewCardVisible}
                setMarkerCoords={setMarkerCoords}
              />
            ))}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              pinColor="blue"
            ></Marker>
            <Circle
              center={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              radius={800}
              strokeWidth={2}
              strokeColor="rgba(45, 33, 202, 0.1)"
              fillColor="rgba(45, 33, 202, 0.1)"
            />
          </MapView>

          <Overlay
            isVisible={toiletCardVisible}
            onBackdropPress={toggleToiletCard}
            overlayStyle={styles.container2}
          >
            <Text>Name: {targetedToilet?.name}</Text>
            <Text>Status: {targetedToilet?.business_status}</Text>
            <Text>Address: {targetedToilet?.formatted_address}</Text>
            {/* <Text>Rating: {targetedToilet?.rating}</Text> */}
            <Button
              title="Get directions"
              onPress={getWalkingDirections}
            ></Button>
            <Text> </Text>
            <Button
              title="See reviews of this toilet"
              onPress={toggleReviewCard}
            ></Button>
          </Overlay>
          <Overlay
            isVisible={reviewCardVisible}
            onBackdropPress={toggleReviewCard}
            overlayStyle={styles.reviewList}
          >
            <Text>Name: {targetedToilet?.name}</Text>
            <Text>Rating: {targetedToilet?.rating}</Text>
            <Button title="Go back" onPress={toggleReviewCard}></Button>
          </Overlay>
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
  container2: {
    backgroundColor: "white",
    borderColor: "black",
    // color: "white",
    borderWidth: 2,
    width: 250,
    height: 400,
  },

  reviewList: {
    backgroundColor: "white",
    borderColor: "black",
    // color: "white",
    borderWidth: 2,
    width: 250,
    height: 400,
    zIndex: 10,
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Character Name
  name: { fontSize: 16, marginBottom: 5 },

  //Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },

  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },

  //Image style
  image: {
    width: 120,
    height: 80,
  },

  //Modal styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  //Text input style
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
