import React, { useEffect, useState, useContext } from "react";
import Container from "@mui/material/Container";
import AddGameForm from "./AddGameForm";
import AddGameSuccessPage from "./AddGameSuccessPage";
import { useMutation } from "@tanstack/react-query";
import ErrorCard from "../Error/ErrorCard";
import { http_POST } from "../../services/httpService";
import LinearProgress from "@mui/material/LinearProgress";
import LiveGameAlert from "../LiveGameAlert/LiveGameAlert";
import { AppContext } from "../../context/AppContext";
import { AppContextType } from "../../context/AppContext";

const AddGame = () => {
  const [isGameRegistered, setIsGameRegistered] = useState(false);
  const { error, isPending, mutate } = useMutation({
    mutationFn: (data) => {
      return http_POST("/Bordtennis/AddGame", data);
    },
  });
  const { gameDetails } = useContext(AppContext) as AppContextType;
  console.log(gameDetails);

  return (
    <Container>
      {!isGameRegistered && !error && (
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
      {gameDetails && (
        <LiveGameAlert
          gameDetails={{
            playerOne: gameDetails.message.split(" ")[0],
            playerTwo: gameDetails.message.split(" ")[2],
          }}
        />
      )}
    </Container>
  );
};

export default AddGame;
