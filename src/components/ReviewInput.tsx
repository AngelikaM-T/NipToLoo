import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { postReviewByToilet } from "../config/api/api";
import { UserContext } from "../context/UserContext";
import CustomInput from "./CustomInput";
import { StyleSheet } from "react-native";

const ReviewInput = ({ stateObj, setReviews }) => {
  const { targetedToilet } = stateObj;
  const { control, handleSubmit, getValues, reset } = useForm({
    mode: "onBlur",
  });
  const { user } = useContext(UserContext);
  const toilet_id = targetedToilet.place_id;
  const [newReview, setNewReview] = useState({
    author: "",
    body: "",
    created_at: "",
  });

  const postReview = () => {
    const values = getValues();
    const review = values.review;
    const author = user.username;

    postReviewByToilet(toilet_id, review, author).then((reviewFromApi) => {
      setNewReview({ ...newReview });
      setReviews((currReviews) => {
        const newReviews = [...currReviews];
        newReviews.unshift(reviewFromApi);
        return newReviews;
      });
    }).then(() => {
      reset();
    })
  };

  return (
    <>
      <CustomInput
        name="review"
        placeholder="Leave your review here"
        control={control}
        rules={{
          required: "Text is required",
          minLength: {
            value: 3,
            message: "Minimum 3 characters",
          },
          maxLength: {
            value: 140,
            message: "Maximum 140 characters",
          },
        }}
      />
      <Button mode="contained" style={styles.button} onPress={handleSubmit(postReview)}>
        Submit
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default ReviewInput;
