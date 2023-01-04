import React from "react";
import { createContext, useState } from "react";

const UserContext = React.createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
  });

export default UserContext;

