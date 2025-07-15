import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { createContext, useState, useMemo } from "react";

const savedMode = window.localStorage.getItem("themeMode")
  ? window.localStorage.getItem("themeMode")
  : "light";

export const ColorModeContext = createContext({
  toggleMode: () => {},
  mode: savedMode,
});

export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState(savedMode);

  const colorMode = useMemo(
    () => ({
      toggleMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        window.localStorage.setItem("themeMode", newMode);
      },
      mode,
    }),
    [mode]
  );

  const theme = createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#091d36",
    },
    secondary: {
      main: "#5e83ba",
    },
    ...(mode === 'light'
      ? {
          background: {
            default: "#f4f6f8", // fondo general claro
            paper: "#ffffff",   // fondo para contenedores tipo Card, Footer, etc.
          },
        }
      : {
          background: {
            default: "#121212", // fondo general oscuro
            paper: "#1e1e1e",   // fondo para contenedores en oscuro
          },
        }),
  },
});


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
