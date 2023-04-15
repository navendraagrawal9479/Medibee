import React, { useMemo } from "react";
import background from "./background.png";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";

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
      </div>
    </ThemeProvider>
  );
};

export default App;
