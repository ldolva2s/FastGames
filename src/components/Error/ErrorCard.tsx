import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

interface Props {
  error: { message: string };
}

const ErrorCard: React.FC<Props> = ({ error }) => {
  console.log(error);
  return (
    <Alert
      severity="warning"
      variant="outlined"
      sx={{ marginTop: 4, textAlign: "left" }}
    >
      <AlertTitle>Warning</AlertTitle>
      {error.message}
    </Alert>
  );
  //   return (
  //     <Card
  //       sx={{
  //         border: "1 px solid red",
  //         borderRadius: 4,
  //         background: "#FEDF00",
  //         marginTop: 4,
  //       }}
  //     >
  //       <CardContent>
  //         <Typography variant="h6" color="text.secondary" gutterBottom>
  //           {"Det oppsto en feil."}
  //         </Typography>
  //         <div style={{ display: "flex" }}>
  //           <ReportProblemIcon sx={{ marginRight: 8 }}></ReportProblemIcon>
  //           <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
  //             {error.message}
  //           </Typography>
  //         </div>
  //       </CardContent>
  //     </Card>
  //   );
};

export default ErrorCard;
