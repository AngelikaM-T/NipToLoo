import React, { useState, useEffect, useContext } from "react";
import { Overlay } from "@rneui/base";
import { getReviewsByToilet } from "../config/api/api";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, List, Paragraph, Title } from "react-native-paper";
import { BrandName } from "./BrandName";
import ReviewInput from "./ReviewInput";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";

interface Reviews {
  body: String;
  author: String;
  toilet_id: String;
  created_at: String;
}

const ReviewCard = ({
  toggleReviewCard,
  setReviewCardVisible,
  reviewCardVisible,
  reviewCardToilet,
  navigation,
  stateObj,
}) => {
  const { isLoggedIn, login, logout, user } = useContext(UserContext);
  const [reviews, setReviews] = useState<Reviews[]>([]);

  const { handleSubmit } = useForm();

  const toilet_id = reviewCardToilet?.place_id || "a";
  const { targetedToilet } = stateObj;

  useEffect(() => {
    getReviewsByToilet(toilet_id).then((reviews) => {
      setReviews(reviews);
    });
  }, [toilet_id]);

  const loginScreen = () => {
    setReviewCardVisible(!reviewCardVisible);
    navigation.navigate("Login");
  };

  return (
    <>
      <Overlay
        isVisible={reviewCardVisible}
        onBackdropPress={toggleReviewCard}
        overlayStyle={styles.reviews}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView keyboardShouldPersistTaps={"handled"}>
            <View style={styles.overlayContent}>
              <BrandName navigation={navigation} stateObj={stateObj} />
              <View style={styles.cardContent}>
                <View style={styles.card}>
                  <Card>
                    <Card.Content>
                      <Title>{targetedToilet?.name}</Title>
                      <Paragraph>
                        Address: {targetedToilet?.formatted_address}
                      </Paragraph>
                      <Paragraph>Rating: {targetedToilet?.rating}</Paragraph>
                      <List.Section>
                        <List.Subheader>Reviews</List.Subheader>
                        <ScrollView>
                          {reviews.map((review, index) => {
                            return (
                              <List.Item
                                title={review?.author}
                                description={[review?.body]}
                                key={index}
                              />
                            );
                          })}
                        </ScrollView>
                      </List.Section>
                      {!isLoggedIn && (
                        <Button
                          uppercase={false}
                          style={styles.loginButton}
                          onPress={handleSubmit(loginScreen)}
                        >
                          Login/register to leave a review
                        </Button>
                      )}
                      {isLoggedIn && (
                        <ReviewInput
                          stateObj={stateObj}
                          reviews={reviews}
                          setReviews={setReviews}
                        />
                      )}

                      <Button
                        mode="contained"
                        onPress={toggleReviewCard}
                        style={styles.button}
                      >
                        Back to loo
                      </Button>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Overlay>
    </>
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

export default ReviewCard;
