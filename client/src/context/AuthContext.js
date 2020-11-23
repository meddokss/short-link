import React, { createContext } from "react";

const AuthContext = createContext({
  token: null,
  userId: null,
  login: null,
  logout: null,
  isAuthenticate: false,
});

export default AuthContext;
