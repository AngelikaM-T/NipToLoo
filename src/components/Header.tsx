import React from "react";
import { Appbar } from "react-native-paper";
 

export const Header = (props: HeaderParams) => {

  const goBack = () => {

  }

  return (
    <Appbar>
      <Appbar.BackAction onPress={goBack}/>
      <Appbar.Content title={props.title} />
    </Appbar>
  );
};


interface HeaderParams {
    title: string;
}