import { useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-paper";
import CustomInput from "./CustomInput";

const ReviewInput = () => {
  const { control, handleSubmit } = useForm({ mode: "onBlur" });

  const postReview = () => {
    //api logic here
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
      <Button mode="contained" onPress={postReview}>
        Submit
      </Button>
    </>
  );
};

export default ReviewInput;
