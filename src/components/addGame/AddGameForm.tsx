import React, { useEffect, useContext, useState } from "react";
import { TextField, Button, Stack, Typography, Container } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import PlayerDropDown from "./PlayerDropDown";
import * as io from "socket.io-client";
import { AppContext } from "../../context/AppContext";
import { AppContextType } from "../../context/AppContext";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider/Divider";
import { useMediaQuery, useTheme } from "@mui/material";

const socket = io.connect("http://localhost:3001");

type formValues = {
  PlayerOne: number;
  PlayerTwo: number;
  ScorePlayerOne?: number;
  ScorePlayerTwo?: number;
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
  const [ToggledWinner, setToggleddWinner] = useState();
  const [winnerId, setWinnerId] = useState(ToggledWinner);
  const [error, setError] = useState(false);
  const handleClickStartGame = () => {
    emitSockeEvent();
    setStartGame(true);
  };

  const onSubmit = async (gameValues: formValues) => {
    console.log("ToggledWinnerId: ", ToggledWinner);
    const playerIds = [gameValues.PlayerOne, gameValues.PlayerTwo];
    const mappedFormValues = {
      // Players: [gameValues.PlayerOne, gameValues.PlayerTwo],
      PlayerOneId: gameValues.PlayerOne,
      PlayerTwoId: gameValues.PlayerTwo,
      ScorePlayerOne: gameValues.ScorePlayerOne || null,
      ScorePlayerTwo: gameValues.ScorePlayerTwo || null,
      WinnerId: ToggledWinner,
      // LoserId: allPlayers.find((p) => p.id !== ToggledWinner)?.id,
      LoserId: playerIds.find((p) => p !== ToggledWinner),
    };

    if (!ToggledWinner) {
      setError(true);
    } else {
      console.log(mappedFormValues);
      // mutate(mappedFormValues);
      mutate(mappedFormValues);
      setIsGameRegistered(true);

      console.log(gameValues);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    socket.on("received_data", (data) => {
      handleSetGameDetails(data);
    });
  }, [socket]);

  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const handleChangeToggle = (
    event: React.MouseEvent<HTMLElement>,
    winner: any
  ) => {
    setToggleddWinner(winner);
  };

  const playerOneStateSelected = watch("PlayerOne");
  const playerTwoStateSelected = watch("PlayerTwo");

  const emitSockeEvent = () => {
    socket.emit("start_game", {
      message: `${
        allPlayers.find((p) => p.id === playerOneStateSelected)?.firstName
      } vs. ${
        allPlayers.find((p) => p.id === playerTwoStateSelected)?.firstName
      }`,
    });
  };
  const { allPlayers, handleSetGameDetails } = useContext(
    AppContext
  ) as AppContextType;
  console.log("All players:", allPlayers);

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
              players={allPlayers.filter(
                (p) => p.id !== playerTwoStateSelected
              )}
              control={form.control}
              name={"PlayerOne"}
              label="Player 1"
            />
            <PlayerDropDown
              name={"PlayerTwo"}
              control={form.control}
              players={allPlayers.filter(
                (p) => p.id !== playerOneStateSelected
              )}
              label="Player 2"
            />
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
            <>
              <Typography sx={{ marginBottom: 2 }}>Select winner:</Typography>
              <ToggleButtonGroup
                color="success"
                exclusive
                aria-label="Platform"
                value={ToggledWinner}
                onChange={handleChangeToggle}
                sx={{ marginBottom: 3 }}
              >
                <ToggleButton
                  value={watch("PlayerOne")}
                  sx={{
                    ":hover": { background: "#EFF5EF", color: "#348037" },
                    minWidth: "60px",
                  }}
                >
                  {/* {watch("PlayerOne")} */}
                  {
                    allPlayers.find((p) => p.id === watch("PlayerOne"))
                      ?.firstName
                  }
                </ToggleButton>
                <ToggleButton
                  value={watch("PlayerTwo")}
                  sx={{
                    ":hover": { background: "#EFF5EF", color: "#348037" },
                    minWidth: "60px",
                  }}
                >
                  {/* {watch("PlayerTwo")} */}
                  {
                    allPlayers.find((p) => p.id === watch("PlayerTwo"))
                      ?.firstName
                  }
                </ToggleButton>
              </ToggleButtonGroup>
              {error && (
                <Typography sx={{ color: "red", marginBottom: 2 }}>
                  Må velge en vinner
                </Typography>
              )}
            </>
          )}
          {startGame && (
            <>
              <Divider sx={{ marginBottom: 2 }}></Divider>
              <>
                <Typography sx={{ marginBottom: 2 }}>
                  Enter score (Optional)
                </Typography>
                <Stack
                  spacing={2}
                  direction="row"
                  sx={{ marginBottom: 4, justifyContent: "center" }}
                >
                  <TextField
                    type="text"
                    variant="outlined"
                    color="secondary"
                    label="Score player one"
                    fullWidth={isMobile}
                    // sx={{ mb: 4, xs: 1, lg: 4, md: 10 }}
                    {...register("ScorePlayerOne", {
                      // required: "Score is required",

                      pattern: {
                        //   value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        value: /^(([01]?[0-9])|(20))$/,
                        message:
                          "Må kun inneholde positive tall opptil max. 20.",
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
                    fullWidth={isMobile}
                    sx={{ mb: 4 }}
                    {...register("ScorePlayerTwo", {
                      // required: "Score is required",
                      pattern: {
                        value: /^(([01]?[0-9])|(20))$/,
                        message:
                          "Må kun inneholde positive tall opptil max. 20.",
                      },
                    })}
                    error={!!errors.ScorePlayerTwo}
                    helperText={errors.ScorePlayerTwo?.message}
                  />
                </Stack>
              </>
            </>
          )}
          {startGame && ToggledWinner && (
            <Typography>{`${
              allPlayers.find((p) => p.id === ToggledWinner)?.firstName
            } is the winner!`}</Typography>
          )}
          <br />
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
