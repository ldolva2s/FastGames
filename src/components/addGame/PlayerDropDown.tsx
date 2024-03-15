import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";

interface Props {
  label: string;
  players: Array<any>;
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
                      return value === player.name;
                    }) ?? null
                  : null
              }
              getOptionLabel={(player) => {
                return player.name;
              }}
              onChange={(event: any, newValue) => {
                onChange(newValue ? newValue.name : null);
              }}
              sx={{ width: 300 }}
              id="controllable-states-demo"
              options={players}
              renderInput={(params) => (
                <TextField {...params} label={label} inputRef={ref} />
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
