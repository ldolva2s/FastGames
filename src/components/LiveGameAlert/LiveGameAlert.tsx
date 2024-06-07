import React, { useState } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { CardContent, Typography, CardHeader } from "@mui/material";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import LiveCircleAnimation from "./LiveCircleAnimation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton/IconButton";
import { useMediaQuery, useTheme } from "@mui/material";

interface Props {
  gameDetails: any;
}

const LiveGameAlert: React.FC<Props> = ({ gameDetails }) => {
  const [open, setOpen] = useState(true);
  const { playerOne, playerTwo } = gameDetails;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(isMobile);
  return (
    <>
      {open && (
        <Card
          sx={{
            background: "#616161",
            borderRadius: 4,
            border: "4px solid #9E9E9E",
            width: isMobile ? "100%" : "30%",
            margin: "auto",
            position: "fixed",
            bottom: 0,
            right: 0,
          }}
        >
          <CardHeader
            avatar={
              <>
                <LiveCircleAnimation />
              </>
            }
            action={
              <IconButton aria-label="settings">
                <CloseIcon onClick={() => setOpen(false)} />
              </IconButton>
            }
            title={<Typography sx={{ color: "white" }}>LIVE</Typography>}
            sx={{ textAlign: "left" }}
          />

          <CardContent>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <AccountCircleIcon
                sx={{ marginRight: 2, transform: "scale(1.5)" }}
              />
              <Container
                sx={{
                  marginBottom: 1,
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{`${playerOne}`}</Typography>
                <Typography sx={{ marginLeft: 3, marginRight: 3 }}>
                  {"vs."}
                </Typography>
                <Typography variant="h6">{playerTwo}</Typography>
              </Container>
              <AccountCircleIcon
                sx={{ marginLeft: 2, transform: "scale(1.5)" }}
              />
            </Container>

            <SportsTennisIcon sx={{ color: "white" }} />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default LiveGameAlert;
