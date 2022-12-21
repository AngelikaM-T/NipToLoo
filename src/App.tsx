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
} from "react-native";
import { Button, Overlay } from "@rneui/base";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
} from "react-native-maps";
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
  const [location, setLocation] = useState<Coords | null>(null);
  const [errorMsg, setErrorMsg] = useState<String | null>(null);
  const [loadingToilets, setLoadingToilets] = useState<boolean>(true);
  const [targetedToilet, setTargetedToilet] = useState(null);
  const [toiletCardVisible, setToiletCardVisible] = useState(false);
  const [reviewCardVisible, setReviewCardVisible] = useState(false);

  const toggleToiletCard = (e = null) => {
    setToiletCardVisible(!toiletCardVisible);

    let matchingToilet;

    if (toiletCardVisible === false) {
      for (let i = 0; i < toiletLocations.length; i++) {
        if (
          e.nativeEvent.coordinate.longitude ===
            toiletLocations[i].geometry.location.lng &&
          e.nativeEvent.coordinate.latitude ===
            toiletLocations[i].geometry.location.lat
        ) {
          matchingToilet = toiletLocations[i];
        }
      }
      setTargetedToilet(matchingToilet);
    }
  };

  const toggleReviewCard = () => {
    setReviewCardVisible(!reviewCardVisible);
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
              latitudeDelta: 0.056866,
              longitudeDelta: 0.054757,
            }}
          >
            {toiletLocations.map((location, index) => (
              <Marker
                style={styles.marker}
                key={index}
                coordinate={{
                  latitude: location ? location.geometry.location.lat! : 0,
                  longitude: location ? location.geometry.location.lng! : 0,
                }}
                title={location.name}
                description="Press here for more details"
              >
                <Callout tooltip={true} onPress={toggleToiletCard} />
              </Marker>
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
            overlayStyle={styles.container2}
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
  marker: {
    borderWidth: 10,
  },

  container2: {
    backgroundColor: "white",
    borderColor: "black",
    // color: "white",
    borderWidth: 2,
    width: 250,
    height: 400,
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
