import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ReviewCard from "./ReviewCard";
import ToiletCard from "./ToiletCard";

const Overlays = ({ stateObj, navigation }) => {
  const [reviewCardToilet, setReviewCardToilet] = useState({});

  const {
    toiletCardVisible,
    reviewCardVisible,
    setToiletCardVisible,
    setReviewCardVisible,
  } = stateObj;

  stateObj.reviewCardToilet = setReviewCardToilet;
  stateObj.setReviewCardToilet = setReviewCardToilet;

  const toggleReviewCard = () => {
    setToiletCardVisible(!toiletCardVisible);
    setReviewCardVisible(!reviewCardVisible);
  };

  return (
    <View>
      <ToiletCard
        toggleReviewCard={toggleReviewCard}
        navigation={navigation}
        stateObj={stateObj}
      />
      <ReviewCard
        toggleReviewCard={toggleReviewCard}
        navigation={navigation}
        stateObj={stateObj}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9ec6cc",
    borderColor: "#9ec6cc",
    borderWidth: 2,
    borderRadius: 20,
    width: "80%",
    height: "55%",
  },
  reviews: {
    backgroundColor: "#9ec6cc",
    borderColor: "#9ec6cc",
    borderWidth: 2,
    borderRadius: 20,
    width: "90%",
    height: "80%",
    zIndex: 10,
  },
  overlayContent: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  card: {
    width: "95%",
    height: "100%",
    margin: 5,
  },
  loginButton: {
    margin: 2,
    marginLeft: 0,
    marginRight: 0,
  },
  button: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default Overlays;
