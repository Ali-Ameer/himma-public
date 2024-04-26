import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material";
import * as locales from "@mui/material/locale";
import Footer from "./components/footer/Footer";

function App() {
  const theme = createTheme(
    {
      direction: "rtl",
      typography: {
        fontFamily: "cairo, sans-serif",
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        fontSize: 12,
      },
      palette: {
        mode: "light",
        primary: {
          main: "#16a34a",
        },
      },
    },
    locales["arSA"]
  );
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"arSA"}>
        <Navbar />
        <Outlet />
        <Footer />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
