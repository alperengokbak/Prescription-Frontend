import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// Context
import { AuthContext } from "../context/Authentication";

// Components
import MedicineTable from "../components/MedicineTable";

function Home() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const navigate = useNavigate();
  const { pharmacy, setPharmacy, isDesktop } = React.useContext(AuthContext);
  const [errorClient, setErrorClient] = React.useState(null);
  const [patientIdNumber, setPatientIdNumber] = React.useState("");
  const [patient, setPatient] = React.useState({
    fullName: "",
    idNumber: "",
  });

  const checkPatient = async () => {
    try {
      const response = await axios.post("http://localhost:3000/prescription-service/pharmacy/searchPatientByIdNumber", {
        idNumber: patientIdNumber,
      });
      if (response.status === 200) {
        const jsonData = response.data;
        setPatient({ idNumber: patientIdNumber, fullName: jsonData.patient?.fullName });
        setErrorClient(null);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorClient(error?.response?.data?.error);
      setPatient({ ...patient, fullName: "" });
    }
  };

  return (
    <>
      {pharmacy ? (
        <Stack
          flexDirection={isDesktop ? "row" : "column"}
          justifyContent="space-between"
          alignItems={isDesktop ? "flex-end" : "flex-start"}
        >
          <Typography variant={isDesktop ? "h4" : "h6"}>Welcome {pharmacy?.name}</Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgb(83, 100, 113)", fontWeight: "bold", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("token");
              setPharmacy(null);
              setPatient({ idNumber: "", fullName: "" });
              setErrorClient(null);
            }}
          >
            Sign Out
          </Typography>
        </Stack>
      ) : (
        <Stack
          flexDirection={isDesktop ? "row" : "column"}
          justifyContent="space-between"
          alignItems={isDesktop ? "flex-end" : "flex-start"}
        >
          <Typography variant={isDesktop ? "h4" : "h6"}>Welcome</Typography>
          <Typography
            variant="body1"
            onClick={() => {
              navigate("/login");
            }}
            sx={{
              display: "flex",
              color: "rgb(83, 100, 113)",
              fontWeight: "bold",
              cursor: "pointer",
              justifyContent: "flex-end",
            }}
          >
            Please Sign In
          </Typography>
        </Stack>
      )}

      <Stack
        sx={{
          width: isDesktop ? "100%" : "90%",
          height: "100%",
          border: "1px solid black",
          borderRadius: "1rem",
          marginTop: "3rem",
          padding: "0.70rem",
        }}
        spacing={3}
      >
        <Stack flexDirection="row" alignItems="center">
          <Typography variant={isDesktop ? "h6" : "body1"} marginRight={4}>
            Pharmacy:
          </Typography>
          <Typography variant={isDesktop ? "body1" : "body2"} fontWeight="bold">
            {pharmacy?.name}
          </Typography>
        </Stack>
        <Stack
          flexDirection={isDesktop ? "row" : "column"}
          alignItems={isDesktop ? "center" : "flex-start"}
          justifyContent="space-between"
          width={errorClient ? "700px" : "600px"}
          spacing={isDesktop ? 0 : 2}
        >
          <Typography variant={isDesktop ? "h6" : "body1"}>Patient Identification Number:</Typography>
          <TextField
            id="idNumber"
            placeholder="Identifacation Number"
            variant="standard"
            required
            onChange={(e) => setPatientIdNumber(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => checkPatient()}
            disabled={!pharmacy}
            sx={{
              background: "#3f51b5",
              color: "#fff",
              width: isDesktop ? "72px" : "64px",
              height: isDesktop ? "30px" : "20px",
              fontSize: isDesktop ? "12px" : "8px",
              ":hover": {
                background: "#757de8",
                color: "#fff",
              },
            }}
          >
            SEARCH
          </Button>
          <Typography variant="body2" fontWeight="bold" color="red">
            {errorClient}
          </Typography>
        </Stack>
        <Stack flexDirection="row" alignItems={isDesktop ? "center" : "flex-start"}>
          <Typography variant={isDesktop ? "h6" : "body1"} marginRight={4}>
            Full Name:
          </Typography>
          <Typography variant={isDesktop ? "body1" : "body2"} fontWeight="bold">
            {patient?.fullName}
          </Typography>
        </Stack>
        <Stack flexDirection="column" alignItems="flex-start" height="100%">
          <MedicineTable />
        </Stack>
      </Stack>
    </>
  );
}

export default Home;
