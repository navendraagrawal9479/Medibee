import React, { useMemo } from "react";
import background from "./background.png";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import UploadModal from "./components/UploadModal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InfoPage from "./components/InfoPage";
import Vision from "./components/Vision";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            element={
              <div>
                <img
                  alt='background'
                  src={background}
                  style={{
                    objectFit: "contained",
                    position: "absolute",
                    height: "100vh",
                    width: "100vw",
                    zIndex: -1,
                  }}
                />
                <Navbar />
                <Main />
                <UploadModal />
                {/* <ExampleComponent /> */}
              </div>
            }
            path='/'
          />
          <Route path='/info/:medicine' element={<InfoPage />} />
          <Route path='/vision' element={<>
            <img
              alt='background'
              src={background}
              style={{
                objectFit: "contained",
                position: "absolute",
                height: "100vh",
                width: "100vw",
                zIndex: -1,
              }}
            />
            <Vision /></>} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
