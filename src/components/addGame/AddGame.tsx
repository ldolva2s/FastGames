import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AddGameForm from "./AddGameForm";
import AddGameSuccessPage from "./AddGameSuccessPage";
import { useMutation } from "@tanstack/react-query";
import DotLoader from "react-spinners/DotLoader";
import ErrorCard from "../Error/ErrorCard";
import { http_POST } from "../../services/httpService";
import LinearProgress from "@mui/material/LinearProgress";
import LiveGameAlert from "../LiveGameAlert/LiveGameAlert";

const AddGame = () => {
  const [isGameRegistered, setIsGameRegistered] = useState(false);
  const { error, isPending, data, mutate } = useMutation({
    mutationFn: (data) => {
      return http_POST("/Bordtennis/AddGame", data);
    },
  });
  const {
    error: errorGettingPlayers,
    isPending: loadingPlayers,
    data: playerData,
    mutate: mutatePlayers,
  } = useMutation({
    mutationFn: (data) => {
      return http_POST("/Bordtennis/GetAllPlayers", data);
    },
  });

  useEffect(() => {
    mutatePlayers();
  }, []);

  console.log(data);
  return (
    <Container>
      {!isGameRegistered && (
        <AddGameForm
          isGameRegistered={isGameRegistered}
          setIsGameRegistered={setIsGameRegistered}
          mutate={mutate}
        />
      )}
      {isPending && <LinearProgress color="secondary" />}
      {error ? (
        <ErrorCard error={error} />
      ) : (
        isGameRegistered &&
        !isPending && (
          <AddGameSuccessPage
            setIsGameRegistered={setIsGameRegistered}
            isPending={isPending}
          />
        )
      )}
      {/* <LiveGameAlert gameDetails={{ playerOne: "Lino", playerTwo: "Vegard" }} /> */}
    </Container>
  );
};

export default AddGame;
