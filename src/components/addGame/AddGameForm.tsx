import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Typography, Container } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { http_POST } from "../../services/httpService";
import PlayerDropDown from "./PlayerDropDown";
import * as io from "socket.io-client";
import DotLoader from "react-spinners/DotLoader";
// const socket = io.connect("http://localhost:4000");
import { QueryClient } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../../index";

type formValues = {
  PlayerOne: string;
  PlayerTwo: string;
  ScorePlayerOne: number;
  ScorePlayerTwo: number;
};

interface Props {
  isGameRegistered: Boolean;
  setIsGameRegistered: any;
  mutate: any;
}

const AddGameForm: React.FC<Props> = ({
  isGameRegistered,
  setIsGameRegistered,
  mutate,
}) => {
  const form = useForm<formValues>();

  const [startGame, setStartGame] = useState(false);
  const [players, setPlayers] = useState([
    { name: "Vegard Røsholm", year: 1994 },
    { name: "Odd Sande", year: 1972 },
    { name: "Per Stian Hoff", year: 1974 },
    { name: "Lino Dolva", year: 2008 },
    { name: "Torgeir Tynes", year: 1957 },
    { name: "Lars Klingenberg", year: 1993 },
    { name: "Martin Tho", year: 1994 },
    { name: "Ola Syversen", year: 1994 },
  ]);

  const queryClient = new QueryClient();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const handleClickStartGame = () => {
    setStartGame(true);
  };

  //   const { error, isPending, data, mutate } = useMutation({
  //     mutationFn: (data) => {
  //       return http_POST("", data);
  //     },
  //   });

  const onSubmit = async (gameValues: formValues) => {
    // const res = await http_POST("/addGame", gameValues);
    // console.log(res);
    // const [mutate, {isLoading, isError, error}] = useMutation(addGame);
    emitSockeEvent();
    mutate(gameValues);
    console.log(gameValues);
  };

  //   useEffect(() => {
  //     socket.on("receive_message", (data) => {
  //       alert(data);
  //     });
  //   }, [socket]);

  const emitSockeEvent = () => {
    //   socket.emit("start_game", { message: "Vegard is now playing vs. Torgeir" });
    setIsGameRegistered(true);
  };

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const playerOneStateSelected = watch("PlayerOne");
  const playerTwoStateSelected = watch("PlayerTwo");

  return (
    <Container>
      <Typography variant="h6" gutterBottom margin={3}>
        Add Game
      </Typography>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            sx={{ marginBottom: 4, justifyContent: "center" }}
          >
            <PlayerDropDown
              players={players.filter((p) => p.name !== playerTwoStateSelected)}
              control={form.control}
              name={"PlayerOne"}
              label="Player 1"
            />
            <PlayerDropDown
              name={"PlayerTwo"}
              control={form.control}
              players={players.filter((p) => p.name !== playerOneStateSelected)}
              label="Player 2"
            />
            {/* <Grid columns={{ xs: 4, sm: 8, md: 12 }}>
            </Grid> */}
          </Stack>
          {!startGame && playerOneStateSelected && playerTwoStateSelected && (
            <Button
              variant="contained"
              onClick={handleClickStartGame}
              sx={{ marginBottom: 4 }}
            >
              Start game
            </Button>
          )}
          {startGame && (
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Score player one"
                fullWidth
                // sx={{ mb: 4, xs: 1, lg: 4, md: 10 }}
                {...register("ScorePlayerOne", {
                  required: "Score is required",

                  pattern: {
                    //   value: /^(0|[1-9]\d*)(\.\d+)?$/,
                    value: /^(([01]?[0-9])|(20))$/,
                    message: "Må kun inneholde positive tall opptil max. 20.",
                  },
                })}
                error={!!errors.ScorePlayerOne}
                helperText={errors.ScorePlayerOne?.message}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Score player two"
                fullWidth
                sx={{ mb: 4 }}
                {...register("ScorePlayerTwo", {
                  required: "Score is required",
                  pattern: {
                    value: /^(([01]?[0-9])|(20))$/,
                    message: "Må kun inneholde positive tall opptil max. 20.",
                  },
                })}
                error={!!errors.ScorePlayerTwo}
                helperText={errors.ScorePlayerTwo?.message}
              />
            </Stack>
          )}

          {startGame && (
            <Button variant="contained" color="secondary" type="submit">
              Register game
            </Button>
          )}
        </form>
      </Container>
    </Container>
  );
};
export default AddGameForm;
