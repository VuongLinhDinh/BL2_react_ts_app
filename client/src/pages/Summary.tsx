import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useStep } from "src/contexts/step";

const Summary: React.FC = () => {
  const { username, phone, setStep } = useStep();

  return (
    <Stack justifyContent={"center"} alignContent={"center"} width={"50%"}>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignContent={"center"}
        width={"50%"}
      >
        <Typography variant="h6">Summary</Typography>
        <Typography variant="body1">Username: {username}</Typography>
        <Typography variant="body1">Phone: {phone}</Typography>
        <Button variant="contained" color="primary" onClick={() => setStep(1)}>
          Start Over
        </Button>
      </Stack>
    </Stack>
  );
};

export default Summary;
