import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authentication";

export default function RegisterScreen() {
  const { setPharmacy } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [values, setValues] = React.useState({
    name: "",
    username: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      username: data.get("username"),
      password: data.get("password"),
    });

    fetch("https://prescription-api-gateway.onrender.com/prescription-service/pharmacy/createPharmacy", {
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
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="name"
                autoFocus
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(e) => setValues({ ...values, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent={"center"}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2, background: "#FF0000" }}>
              Sign Up
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Link href="/login" variant="body2" sx={{ color: "#FF0000" }}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
