import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import GamesMenu from "./GamesMenu";
import { http_GET } from "../../services/httpService";
import { useMutation } from "@tanstack/react-query";
import LinearProgress from "@mui/material/LinearProgress";
import ErrorCard from "../Error/ErrorCard";

const HomePage = () => {
  const {
    error,
    isPending,
    data,
    mutate: GetAllPlayers,
  } = useMutation({
    mutationFn: () => {
      return http_GET("/Player/GetAllPlayers");
    },
  });
  useEffect(() => {
    GetAllPlayers();
  }, []);

  console.log(data);

  return (
    <>
      {isPending && <LinearProgress />}
      {error && <ErrorCard error={error}></ErrorCard>}
      <Typography variant="h6" gutterBottom margin={3}>
        Welcome to Fast Games
      </Typography>
      <GamesMenu></GamesMenu>
    </>
  );
};

export default HomePage;
