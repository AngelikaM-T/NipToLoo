import React from "react";
import { Appbar } from "react-native-paper";

export const Header = (props: HeaderParams) => {
  return (
    <Appbar>
      <Appbar.BackAction />
      <Appbar.Content title={props.title} />
    </Appbar>
  );
};


interface HeaderParams {
    title: string;
}