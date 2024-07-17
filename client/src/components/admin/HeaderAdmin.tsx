import { Stack, TextField } from "@mui/material";
import React from "react";
import SelectFilter from "../SelectFilter";

const HeaderAdmin = () => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={"5"}
      spacing={2}
      padding={"20px 5px"}
      margin={"0 20px 0"}
    >
      <TextField
        id="standard-basic"
        label="search every thing.."
        variant="standard"
        fullWidth
      />
      <SelectFilter />
    </Stack>
  );
};

export default HeaderAdmin;
