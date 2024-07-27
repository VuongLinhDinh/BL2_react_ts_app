import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

import UsernameForm from "./UsernameForm";
import PhoneForm from "./PhoneForm";
import Summary from "./Summary";
import { useStep } from "src/contexts/step";

const StepForm: React.FC = () => {
  const { step } = useStep();

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={step - 1} alternativeLabel>
        <Step>
          <StepLabel>Username</StepLabel>
        </Step>
        <Step>
          <StepLabel>Phone</StepLabel>
        </Step>
        <Step>
          <StepLabel>Summary</StepLabel>
        </Step>
      </Stepper>
      <Box sx={{ mt: 2 }}>
        {step === 1 && <UsernameForm />}
        {step === 2 && <PhoneForm />}
        {step === 3 && <Summary />}
      </Box>
    </Box>
  );
};

export default StepForm;
