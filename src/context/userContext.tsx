import { createContext } from "react";
import { defaultUser } from "./defaults";
import { User } from "./types";

const UserContext = createContext({
  user: defaultUser,
  setUser: (user: User) => {},
});

export { UserContext };
