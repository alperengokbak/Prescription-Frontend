import React, { useEffect } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import { AuthContext } from "../context/Authentication";
import axios from "axios";

export default function MedicineTable() {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `${token}`;
  const { isDesktop, pharmacy } = React.useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = React.useState(null);
  const [medicineName, setMedicineName] = React.useState("");
  const [medicines, setMedicines] = React.useState([]);
  const [errorForMedicine, setErrorForMedicine] = React.useState(null);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [prescriptionMessage, setPrescriptionMessage] = React.useState("");

  console.log(prescriptionMessage);

  React.useEffect(() => {
    const newTotalPrice = medicines.reduce((sum, medicine) => sum + (parseInt(medicine?.price) || 0), 0);
    setTotalPrice(newTotalPrice);
  }, [medicines]);

  const handleRowClick = (index) => {
    setSelectedMedicine(index);
  };

  const handleDeleteSelectedRow = () => {
    if (selectedMedicine !== null) {
      const updatedMedicines = [...medicines];
      updatedMedicines.splice(selectedMedicine, 1);
      setMedicines(updatedMedicines);
      setSelectedMedicine(null);
    }
  };

  const searchMedicine = async () => {
    try {
      const response = await axios.post(
        "https://prescription-api-gateway.onrender.com/prescription-service/client/searchMedicine",
        {
          name: medicineName,
        }
      );
      if (response.status === 200) {
        const jsonData = response.data;
        if (jsonData.length === 0) {
          setErrorForMedicine("Medicine not found");
        } else {
          const firstMedicine = { name: jsonData[0].name, price: jsonData[0].price };
          setMedicines((prevMedicines) => [...prevMedicines, firstMedicine]);
          setErrorForMedicine(null);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const createPrescription = async () => {
    try {
      const response = await axios.post(
        "https://prescription-api-gateway.onrender.com/prescription-service/pharmacy/createPrescription",
        {
          id: pharmacy?.id,
          totalSalesAmount: totalPrice,
        }
      );
      if (response.status === 200) {
        const jsonData = response.data;
        setPrescriptionMessage(jsonData.message);
        setMedicines([]);
        setSelectedMedicine(null);
        setMedicineName("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Stack
        flexDirection={isDesktop ? "row" : "column"}
        alignItems={isDesktop ? "center" : "flex-start"}
        justifyContent="space-between"
        width={errorForMedicine ? "560px" : "400px"}
        spacing={isDesktop ? 0 : 2}
      >
        <Typography variant={isDesktop ? "h6" : "body1"}>Medicine:</Typography>
        <TextField variant="standard" onChange={(e) => setMedicineName(e.target.value)} />
        <Button
          variant="contained"
          onClick={searchMedicine}
          sx={{
            background: "#3f51b5",
            color: "#fff",
            height: isDesktop ? "30px" : "20px",
            fontSize: isDesktop ? "12px" : "8px",
            ":hover": {
              background: "#757de8",
              color: "#fff",
            },
          }}
        >
          ADD
        </Button>
        <Typography variant="body1" color="red" fontWeight="bold">
          {errorForMedicine}
        </Typography>
      </Stack>

      <Stack flexDirection="row" marginTop={2}>
        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #ccc",
            width: isDesktop ? "300px" : "200px",
            height: isDesktop ? "300px" : "200px",
            margin: 2,
            overflow: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                  }}
                  align="left"
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  hover
                  selected={index === selectedMedicine}
                  onClick={() => handleRowClick(index)}
                >
                  <TableCell component="th" scope="row">
                    {medicine?.name}
                  </TableCell>
                  <TableCell align="left">{medicine?.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack flexDirection="column" justifyContent="center" height="180px" marginLeft={0.5} spacing={2}>
          <Button
            sx={{
              background: "#3f51b5",
              color: "#fff",
              height: isDesktop ? "30px" : "20px",
              fontSize: isDesktop ? "12px" : "8px",
              ":hover": {
                background: "#757de8",
                color: "#fff",
              },
            }}
            disabled
          >
            Edit
          </Button>
          <Button
            sx={{
              background: "#3f51b5",
              color: "#fff",
              height: isDesktop ? "30px" : "20px",
              fontSize: isDesktop ? "12px" : "8px",
              ":hover": {
                background: "#757de8",
                color: "#fff",
              },
            }}
            onClick={handleDeleteSelectedRow}
          >
            Delete
          </Button>
        </Stack>
      </Stack>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        marginLeft={2}
        maxWidth="400px"
        width={isDesktop ? "390px" : "285px"}
        paddingBottom={2}
      >
        <Typography variant={isDesktop ? "h6" : "body1"}>Total Price: {totalPrice}</Typography>
        <Button
          disabled={pharmacy ? false : true}
          sx={{
            background: "#3f51b5",
            color: "#fff",
            height: isDesktop ? "30px" : "20px",
            fontSize: isDesktop ? "12px" : "8px",

            ":hover": {
              background: "#757de8",
              color: "#fff",
            },
          }}
          onClick={createPrescription}
        >
          Create Prescription
        </Button>
        {prescriptionMessage && (
          <Typography variant="body1" color="red" fontWeight="bold">
            {prescriptionMessage}
          </Typography>
        )}
      </Stack>
    </>
  );
}
