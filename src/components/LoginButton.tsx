import { View } from "react-native";
import { Button } from "react-native-paper";

const LoginButton = (props: {navigation: any}) => {
  const {navigation} = props
  const loginScreen = () => navigation.navigate('Login');

  return (
    <View>
      <Button onPress={loginScreen} mode="contained">
        L
      </Button>
    </View>
  );
};

export default LoginButton;
