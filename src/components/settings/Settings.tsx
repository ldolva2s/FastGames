import React, { useState, useContext } from "react";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { AppContext, AppContextType } from "../../context/AppContext";

const Settings = () => {
  const { handleSetDarkMode, darkMode } = useContext(
    AppContext
  ) as AppContextType;

  return (
    <Container sx={{ borderRadius: 4, marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Settings
      </Typography>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <Typography>
          {darkMode ? "Turn on light mode" : "Turn on dark mode"}
        </Typography>
        <Switch
          checked={darkMode}
          onClick={handleSetDarkMode}
          color="primary"
        />
      </Container>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Turn on notifications</Typography>
        <Switch />
      </Container>
    </Container>
  );
};

export default Settings;
