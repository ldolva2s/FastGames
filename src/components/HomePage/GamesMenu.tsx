import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import GameCard from "../GameCard/GameCard";
import { Container } from "@mui/material";
import tableTennisImage from "../../images/tabletennis.png";
import BiljardImage from "../../images/biljard.jpeg";

const GamesMenu = () => {
  return (
    <>
      <Container>
        <Grid container spacing={4} sx={{ padding: 3, textAlign: "center" }}>
          <Grid item xs={12}>
            <GameCard CardTitle="Bordtennis" image={tableTennisImage} />
          </Grid>

          <Grid item xs={12}>
            <GameCard CardTitle="Biljard" image={BiljardImage}></GameCard>
          </Grid>

          {/* <Grid item xs={12}>
            <GameCard></GameCard>
          </Grid>

          <Grid item xs={12}>
            <GameCard></GameCard>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
};

export default GamesMenu;
