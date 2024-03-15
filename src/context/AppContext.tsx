import React, { useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeFunction } from "../utils/theme";

export type AppContextType = {
  darkMode: boolean;
  setDarkMode: () => void;
  handleSetDarkMode: () => void;
};

export const AppContext = createContext<AppContextType | {}>({});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleSetDarkMode = () => setDarkMode(!darkMode);

  type modeType = "light" | "dark";
  type darkMode = boolean;

  const theme = createTheme({
    palette: {
      background: {},
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#CF022B",
        light: "#fbc02d",
        dark: "#757575",
      },
      secondary: {
        main: "#258AC9",
      },
    },
  });

  return (
    <AppContext.Provider
      value={{
        darkMode,
        handleSetDarkMode,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
