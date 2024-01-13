// React and react router
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Material UI Components
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Context
import { AuthContext } from "../context/Authentication.jsx";

export default function LoginScreen() {
  const { setPharmacy } = useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });

    await fetch("https://prescription-api-gateway.onrender.com/prescription-service/pharmacy/loginPharmacy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Success") {
          setPharmacy(data.pharmacy);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#FF0000" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Grid container justifyContent="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                background: "#FF0000",
              }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Link href="/register" variant="body2" color={"#FF0000"}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
