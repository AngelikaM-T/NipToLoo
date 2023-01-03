import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, Text } from "react-native";
import { Button, Overlay } from "@rneui/base";
import { getReviewsByToilet } from "../config/api/api";
import LoginButton from "./LoginButton";

interface Reviews {
  body: String;
  username: String;
  place_id: String;
}

const Overlays = ({ stateObj, navigation }) => {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  console.log(reviews);

  const {
    toiletCardVisible,
    targetedToilet,
    reviewCardVisible,
    setToiletCardVisible,
    setReviewCardVisible,
    location,
    toiletLocations,
    setTargetedToilet,
  } = stateObj;
  const toggleReviewCard = () => {
    setToiletCardVisible(!toiletCardVisible);
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
    getReviewsByToilet(location.place_id).then((reviews) => {
      setReviews(reviews!);
    });
  }, []);

  return (
    <>
      <Overlay
        isVisible={toiletCardVisible}
        onBackdropPress={toggleToiletCard}
        overlayStyle={styles.container2}
      >
        <Text>Name: {targetedToilet?.name}</Text>
        <Text>Status: {targetedToilet?.business_status}</Text>
        <Text>Address: {targetedToilet?.formatted_address}</Text>
        <Button title="Get directions" onPress={getWalkingDirections}></Button>
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
        <LoginButton navigation={navigation} />
        <Button title="Go back" onPress={toggleReviewCard}></Button>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container2: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    width: 250,
    height: 400,
  },

  reviewList: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    width: 250,
    height: 400,
    zIndex: 10,
  },
});

export default Overlays;
