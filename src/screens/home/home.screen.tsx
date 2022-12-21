import { View, Text, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";

interface LoginScreenProps {
  navigation: any;
}

export const HomeScreen = (props: LoginScreenProps) => {
  const handlePress = () => props.navigation.navigate("Login");

  return (
    <SafeAreaView>
      <Text>This is where the homescreen is</Text>
      <Button onPress={handlePress} mode="contained">
        Log in
      </Button>
    </SafeAreaView>
  );
};
