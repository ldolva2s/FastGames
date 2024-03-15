import React from "react";
import AddPlayerForm from "./AddPlayerForm";
import { Container } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { http_POST } from "../../services/httpService";
import AddPlayerSuccessPage from "./AddPlayerSuccessPage";
import ErrorCard from "../Error/ErrorCard";

const AddPlayer = () => {
  const { error, isPending, data, mutate } = useMutation({
    mutationFn: (data) => {
      return http_POST("/Player/AddPlayer", data);
    },
  });

  return (
    <Container>
      {!data && !error && <AddPlayerForm mutate={mutate} />}
      {error ? (
        <ErrorCard error={error} />
      ) : (
        !isPending && data && <AddPlayerSuccessPage isPending={isPending} />
      )}
    </Container>
  );
};

export default AddPlayer;
