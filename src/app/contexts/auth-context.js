"use client";

import { createContext, useContext, useState } from "react";

const authContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

export { AuthContextProvider, useAuthContext };
