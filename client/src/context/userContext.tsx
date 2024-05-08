import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";

import { createContext } from "react";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("users/profile").then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
