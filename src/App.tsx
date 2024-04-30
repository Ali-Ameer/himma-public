import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material";
// import * as locales from "@mui/material/locale";
import Footer from "./components/footer/Footer";

import router from "./router";
import stylisRTLPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import 'dayjs/locale/ar-iq'

const cacheRTL = createCache({
  key: "mui-style-rtl",
  stylisPlugins: [stylisRTLPlugin],
});

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
          main: "#0d9488",
        },
      },
    },
  );

  return (
    <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ar-iq"}>
          <HashRouter>
            <Navbar />
            <Routes>
              {router.map((router) => (
                <Route
                  key={router.path}
                  path={router.path}
                  element={router.element}
                />
              ))}
            </Routes>
            <Footer />
          </HashRouter>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
