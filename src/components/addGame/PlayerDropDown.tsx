import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import { Player } from "../../utils/types";
interface Props {
  label: string;
  players: Array<Player>;
  control: any;
  name: string;
}

const PlayerDropDown: React.FC<Props> = ({ label, players, control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: "*",
      }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              value={
                value
                  ? players.find((player) => {
                      return value === player.id;
                    }) ?? null
                  : null
              }
              getOptionLabel={(player) => {
                return `${player.firstName} ${player.lastName}`;
              }}
              onChange={(event: any, newValue) => {
                onChange(newValue ? newValue.id : null);
              }}
              sx={{ width: 300 }}
              id="controllable-states-demo"
              options={players}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  id="textfieldId"
                  label={label}
                  inputRef={ref}
                />
              )}
            />
            <br></br>
            {error ? (
              <span style={{ color: "red" }}>{error.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};

export default PlayerDropDown;
