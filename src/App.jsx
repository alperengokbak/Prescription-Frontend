// React
import React from "react";

// React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Material UI Components
import { Container } from "@mui/material";

// Context
import { AuthContext } from "./context/Authentication";

// Services
import { LoginAuthentication } from "./service/LoginAuthentication";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";

function App() {
  const { pharmacy, setPharmacy } = React.useContext(AuthContext);

  const checkPharmacy = async () => {
    const loggedInPharmacy = await LoginAuthentication();
    if (loggedInPharmacy) {
      setPharmacy(loggedInPharmacy);
    } else {
      setPharmacy(null);
    }
  };

  React.useEffect(() => {
    if (!pharmacy && pharmacy !== null) {
      checkPharmacy();
    }
  }, [pharmacy]);

  return (
    <Container
      maxWidth="md"
      sx={{
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
      }}
    >
      <Router>
        <Routes>
          {pharmacy ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
