import React from "react";
import { StepProvider } from "src/contexts/step";
import StepForm from "./StepForm";

const StepProviderWrapper: React.FC = () => {
  return (
    <StepProvider>
      <StepForm />
    </StepProvider>
  );
};

export default StepProviderWrapper;
