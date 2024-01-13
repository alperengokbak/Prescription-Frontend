import { createTheme } from "@mui/material/styles";

const colors = {
  black: "#000000",
  red: "#FF0000",
  white: "#FFFFFF",
  spanGray: "rgb(83, 100, 113)",
};
export const MainTheme = createTheme({
  palette: {
    primary: {
      main: colors.black,
    },
    secondary: {
      main: colors.red,
    },
    third: {
      main: colors.white,
    },
  },
  components: {},
});
