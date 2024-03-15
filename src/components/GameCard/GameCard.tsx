import React from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import bilde from "../../images/tabletennis.png";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  CardTitle: string;
  image: any;
}

const GameCard: React.FC<Props> = ({ CardTitle, image }) => {
  const navigate = useNavigate();
  const routeChange = (route: string) => {
    navigate(route);
  };
  const handleClickRegsiterGame = () => {
    routeChange("/addGame");
  };
  return (
    <Card sx={{ maxWidth: 345, background: "#fdd835", margin: "0 auto" }}>
      <CardHeader title={CardTitle} subheader="September 14, 2016" />
      <CardMedia component="img" height="194" image={image} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {CardTitle}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            ":hover": {
              bgcolor: "primary.main", // theme.palette.primary.main
              color: "white",
            },
          }}
          startIcon={<AddCircleIcon />}
          onClick={handleClickRegsiterGame}
        >
          <Typography>Registrer spill</Typography>
        </Button>
        {/* <IconButton aria-label="add to favorites">
          <AddCircleIcon></AddCircleIcon>
        </IconButton> */}
        {/* <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore> */}
      </CardActions>
    </Card>
  );
};

export default GameCard;
