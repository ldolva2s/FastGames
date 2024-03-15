import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import Alert from "@mui/material/Alert";

interface Props {
  setIsGameRegistered: (state: boolean) => void;
  isPending: Boolean;
}

const AddGameSuccessPage: React.FC<Props> = ({
  setIsGameRegistered,
  isPending,
}) => {
  const navigate = useNavigate();

  const handleNewGameclick = () => {
    setIsGameRegistered(false);
    navigate("/addGame");
  };

  const handleGoHomeClick = () => {
    setIsGameRegistered(false);
    navigate("/");
  };
  return (
    <Container>
      {isPending && (
        <Container>
          <div>
            <DotLoader color="#26A65B" size="60px" />
          </div>
        </Container>
      )}
      <Alert variant="outlined" severity="success" sx={{ marginTop: 2 }}>
        Game was successfully added!
      </Alert>

      <Button
        variant="contained"
        onClick={handleNewGameclick}
        sx={{ margin: 3 }}
      >
        Add new game
      </Button>
      <br />
      <Button color="secondary" variant="contained" onClick={handleGoHomeClick}>
        Home
      </Button>
    </Container>
  );
};

export default AddGameSuccessPage;
