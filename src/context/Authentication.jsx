// React
import React, { createContext, useState } from "react";

// Material UI Components
import { useMediaQuery } from "@mui/material";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [pharmacy, setPharmacy] = useState(undefined);

  return (
    <AuthContext.Provider
      value={{
        pharmacy,
        setPharmacy,
        isDesktop,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
