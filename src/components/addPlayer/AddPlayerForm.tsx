import React, { useEffect, useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import Switch from "@mui/material/Switch";
import { http_POST } from "../../services/httpService";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Container } from "@mui/material";

type formValues = {
  firstName: string;
  lastName: string;
  tribe: string;
  squad: string;
  isInFast: boolean;
  birthdate: any;
};

interface Props {
  mutate: any;
}

const AddPlayerForm: React.FC<Props> = ({ mutate }) => {
  const [isInFast, setIsInFast] = useState(true);

  const form = useForm<formValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      tribe: "",
      isInFast: true,
      birthdate: "",
    },
  });

  const { register, handleSubmit, formState, control, watch } = form;
  const { errors } = formState;

  const onSubmit = async (data: formValues) => {
    // const res = await http_POST("/addPlayer", data);
    console.log("kjører");
    console.log(data);
    mutate(data);
  };

  //   function handleSubmit(event: any) {
  //     event.preventDefault();
  //     console.log(firstName, lastName, dateOfBirth);
  //   }

  const handleClickRadioYes = (event: any) => {
    setIsInFast(true);
  };
  const handleClickRadioNo = (event: any) => {
    setIsInFast(false);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom margin={3}>
        Add player
      </Typography>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="First Name"
            fullWidth
            required
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /[a-z\Wæøå]+/gim,
                message: "Må kun inneholde bokstaver.",
              },
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            type="text"
            label="Last Name"
            variant="outlined"
            color="secondary"
            fullWidth
            required
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /[a-z\Wæøå]+/gim,
                message: "Må kun inneholde bokstaver.",
              },
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Stack>
        {/* <Container>
          <FormLabel>Fødselsdato</FormLabel>
          <br></br>
          <Controller
            control={control}
            name="birthdate"
            rules={{ required: true }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  // format="DD-MM-YYYY"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </Container> */}
        <Container>
          <FormLabel>Fødselsdato</FormLabel>
          <br></br>
          <Controller
            control={control}
            name="birthdate"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="DD-MM-YYYY"
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                  value={value}
                  onChange={(event) => {
                    console.log(event.toDate().toUTCString());
                    onChange(event.toDate().toISOString());
                  }}
                />
              </LocalizationProvider>
            )}
          />
        </Container>

        <Controller
          control={control}
          name="isInFast"
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <FormLabel id="demo-radio-buttons-group-label">
                Jobber du i Fast?
              </FormLabel>
              <RadioGroup defaultValue={true} {...field}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <FormControlLabel
                    onClick={handleClickRadioYes}
                    value={true}
                    control={<Radio />}
                    label="Ja"
                  />
                  <FormControlLabel
                    onClick={handleClickRadioNo}
                    value={false}
                    control={<Radio />}
                    label="Nei"
                  />
                </div>
              </RadioGroup>
            </>
          )}
        />
        {/* <Switch checked={workingInFast} onClick={handleToggleInFast} /> */}
        <br></br>
        {isInFast && (
          <Stack>
            <Box sx={{ minWidth: 120, marginBottom: 2, marginTop: 2 }}>
              <TextField
                select
                fullWidth
                label="Tribe"
                sx={{ marginBottom: 4, textAlign: "left" }}
                defaultValue=""
                inputProps={register("tribe", {
                  required: "Please enter tribe",
                })}
                //   error={errors.tribe}
                //   helperText={errors.tribe?.message}
              >
                <MenuItem value={"rebase"}>Rebase</MenuItem>
                <MenuItem value={"wePushToMoss"}>WePushToMoss</MenuItem>
                <MenuItem value={"rainbowWarriors"}>Rainbow Warriors</MenuItem>
                <MenuItem value={"dx"}>DX</MenuItem>
                <MenuItem value={"salesforce"}>Salesforce</MenuItem>
                <MenuItem value={"annet"}>Annet</MenuItem>
              </TextField>
              <br></br>
            </Box>
          </Stack>
        )}

        <Button variant="contained" color="secondary" type="submit">
          Add player
        </Button>
      </form>
    </>
  );
};

export default AddPlayerForm;
