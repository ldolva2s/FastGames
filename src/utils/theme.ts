import { createTheme } from "@mui/material/styles";

type darkMode = boolean;

export const themeFunction = (darkMode?: darkMode) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#CF022B",
      },
      secondary: {
        main: "#258AC9",
      },
    },
  });
  return theme;
};
