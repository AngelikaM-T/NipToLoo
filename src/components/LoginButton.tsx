import { View } from "react-native";
import { Button } from "react-native-paper";



const LoginButton = ({LoginButtonProps}) => {
  const loginScreen = () => LoginButtonProps.navigation.navigate("Login");

  return (
    <View>
      <Button onPress={loginScreen} mode="contained">
        L
      </Button>
    </View>
  );
};

export default LoginButton;
