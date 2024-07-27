import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { useStep } from "src/contexts/step";

const PhoneForm: React.FC = () => {
  const { phone, setPhone, setStep } = useStep();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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

export default PhoneForm;
