import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Constants from "expo-constants";
import Geocoder from "react-native-geocoding";

Geocoder.init(GOOGLE_API_KEY);

const PlaceSearch = ({ setLocation }) => {
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
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    width: "95%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: Constants.statusBarHeight,
  },
});

export default PlaceSearch;
