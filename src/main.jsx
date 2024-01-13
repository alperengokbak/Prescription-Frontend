// React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App.jsx";

// Theme
import { MainTheme } from "./Theme.jsx";
import { ThemeProvider } from "@mui/material";

// Context
import { AuthContextProvider } from "./context/Authentication.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={MainTheme}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </ThemeProvider>
);
