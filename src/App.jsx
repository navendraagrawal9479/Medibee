import React, { useMemo } from "react";
import background from "./background.png";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import UploadModal from "./components/UploadModal";

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <ThemeProvider theme={theme}>
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
      </div>
    </ThemeProvider>
  );
};

export default App;
