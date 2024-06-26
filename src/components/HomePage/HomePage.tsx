import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import GamesMenu from "./GamesMenu";
import { http_GET } from "../../services/httpService";
import { useMutation } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorCard from "../Error/ErrorCard";

const HomePage = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom margin={3}>
        Welcome to Fast Games
      </Typography>
      <GamesMenu></GamesMenu>
    </>
  );
};

export default HomePage;
