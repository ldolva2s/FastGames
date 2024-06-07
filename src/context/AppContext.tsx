import React, { useState, createContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Player } from "../utils/types";
import { http_GET } from "../services/httpService";

export type AppContextType = {
  darkMode: boolean;
  setDarkMode: () => void;
  handleSetDarkMode: () => void;
  allPlayers: Player[];
  isPlayingGame: boolean;
  gameDetails: any;
  handleSetGameDetails: (data: any) => void;
};

export const AppContext = createContext<AppContextType | {}>({});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    if (sessionStorage.getItem("allPlayers") === null) {
      getAllPlayers();
    }
  }, []);

  const getSessionStorageOrDefault = (key: string, defaultValue: any) => {
    const stored = sessionStorage.getItem(key);
    if (!stored) {
      return defaultValue;
    } else {
      return JSON.parse(stored);
    }
  };
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>();
  const [isPlayingGame, setIsPlayingGame] = useState<boolean>(false);
  const [gameDetails, setGameDetails] = useState();
  const [allPlayers, setAllPlayers] = useState(
    getSessionStorageOrDefault("allPlayers", [])
  );

  const getAllPlayers = async () => {
    setLoading(true);
    try {
      const res = await http_GET("/Player/GetAllPlayers");
      sessionStorage.setItem("allPlayers", JSON.stringify(res));
      console.log(res);
      setAllPlayers(res);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSetGameDetails = (data: any) => {
    setGameDetails(data);
  };

  const handleSetDarkMode = () => setDarkMode(!darkMode);

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
        allPlayers,
        isPlayingGame,
        gameDetails,
        handleSetGameDetails,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};
