import React from "react";
import { createContext, useState } from "react";


// const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState({username: "", email: ""})

//   function login(username, email) {
//     setIsLoggedIn(true);
//     setUser({username: username, email: email})
//   }

//   function logout() {
//     setIsLoggedIn(false);
//     setUser({username: "", email: ""})
//   }

// const UserContext = React.createContext({
//     isLoggedIn: false,
//     login: (username, email) => {},
//     logout: () => {}
//   });

// export default UserContext;


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



