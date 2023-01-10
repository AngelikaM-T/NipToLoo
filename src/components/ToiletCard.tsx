import React from "react";
import { Overlay } from "@rneui/base";
import { Linking, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { BrandName } from "./BrandName";

interface Props {
  toggleReviewCard: any;
  navigation: any;
  stateObj: any;
}

const ToiletCard: React.FC<Props> = ({
  toggleReviewCard,
  navigation,
  stateObj,
}) => {
  const {
    toiletCardVisible,
    targetedToilet,
    setToiletCardVisible,
    location,
    toiletLocations,
    setTargetedToilet,
    setReviewCardToilet,
  } = stateObj;

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
      setReviewCardToilet(matchingToilet);
    }
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

  return (
    <Overlay
      isVisible={toiletCardVisible}
      onBackdropPress={toggleToiletCard}
      overlayStyle={styles.container}
    >
      <View style={styles.overlayContent}>
        <BrandName navigation={navigation} stateObj={stateObj} />
        <View style={styles.cardContent}>
          <View style={styles.card}>
            <Card>
              <Card.Content>
                <Title>{targetedToilet?.name}</Title>
                <Paragraph>Status: {targetedToilet?.business_status}</Paragraph>
                <Paragraph>
                  Address: {targetedToilet?.formatted_address}
                </Paragraph>
                <Paragraph>Rating: {targetedToilet?.rating}</Paragraph>
                <Button
                  mode="contained"
                  onPress={getWalkingDirections}
                  style={styles.button}
                >
                  Get directions
                </Button>
                <Button
                  mode="contained"
                  onPress={toggleReviewCard}
                  style={styles.button}
                >
                  Reviews
                </Button>
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
    </Overlay>
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
  button: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ToiletCard;
