import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useStep } from "src/contexts/step";

const UsernameForm: React.FC = () => {
  const { username, setUsername, setStep } = useStep();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          sx={{ width: "50%" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Stack>
    </form>
  );
};

export default UsernameForm;
