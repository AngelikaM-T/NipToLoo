import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


interface HeaderParams {
  title: string;
}

export const Header = (props: HeaderParams) => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Appbar>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={props.title} />
    </Appbar>
  );
};

