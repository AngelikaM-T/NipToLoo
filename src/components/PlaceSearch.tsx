import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Geocoder from "react-native-geocoding";
import CurrentLocationButton from "./ResetLocationButton";
import LoginButton from "./LoginButton";
import { NavigationContext } from "@react-navigation/native";

Geocoder.init(GOOGLE_API_KEY);

const PlaceSearch = ({ stateObj, navigation }) => {
  const { setLocation, currentLocation } = stateObj;
  const onPressHandler = (data, details = null) => {
    Geocoder.from(data.description).then((json) => {
      const newLocation = json.results[0].geometry.location;
      const newLocationObj = {
        latitude: newLocation ? newLocation.lat! : 0,
        longitude: newLocation ? newLocation.lng! : 0,
      };
      setLocation(newLocationObj);
    });
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={onPressHandler}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
        />
      </View>
      <View style={styles.buttons}>
        <CurrentLocationButton
          currentLocation={currentLocation}
          setLocation={setLocation}
        />
      </View>
      <View style={styles.buttons}>
        <LoginButton navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    top: 40,
    padding: 0,
  },
  searchContainer: {
    width: "60%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.4,
    elevation: 4,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.4,
    elevation: 4,
    borderRadius: 8,
    height: "100%",
  },
});

export default PlaceSearch;
