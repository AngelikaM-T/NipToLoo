import React, { useState } from 'react';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({username: "", email: ""})

  const login = (username, email) => {
    setUser({username: username, email: email});
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser({username: "", email: ""})

  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};