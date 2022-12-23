import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";
import Geocoder from "react-native-geocoding";
import CurrentLocationButton from "./CurrentLocationButton";
import LoginButton from "./LoginButton";

Geocoder.init(GOOGLE_API_KEY);

const PlaceSearch = ({ stateObj }, {LoginButtonProps}) => {
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
      <CurrentLocationButton
        currentLocation={currentLocation}
        setLocation={setLocation}
      />
      <LoginButton LoginButtonProps={LoginButtonProps}/>
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
    padding: 4,

  },
  searchContainer: {
    width: '70%',
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 0.4,
    elevation: 4,
    borderRadius: 8,
  },
});

export default PlaceSearch;
