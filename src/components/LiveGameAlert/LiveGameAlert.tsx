import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { CardContent, Typography } from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import LiveCircleAnimation from "./LiveCircleAnimation";

interface Props {
  gameDetails: any;
}
const LiveGameAlert: React.FC<Props> = ({ gameDetails }) => {
  const { playerOne, playerTwo } = gameDetails;
  return (
    <Container>
      <Card
        sx={{
          background: "#616161",
          borderRadius: 4,
          border: "4px solid #9E9E9E",
        }}
      >
        <CardContent>
          <LiveCircleAnimation></LiveCircleAnimation>
          <Typography sx={{ marginBottom: 1, color: "white" }}>LIVE</Typography>
          <Typography sx={{ marginBottom: 1, color: "white" }}>
            {playerOne} vs. {playerTwo}
          </Typography>
          <SportsTennisIcon sx={{ color: "white" }} />
        </CardContent>
      </Card>
    </Container>
  );
};

export default LiveGameAlert;
