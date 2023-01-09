import { createContext } from "react";

type User = {
    username: string,
    email: string
}

export interface UserState {
    isLoggedIn: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
    user: User;
  }
  
  const defaultLoginState: UserState = {
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    user: {username: "", email: ""}
  };
  
  export const UserContext = createContext(defaultLoginState);



