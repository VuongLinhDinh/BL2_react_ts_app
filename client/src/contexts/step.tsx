import React, { createContext, ReactNode, useContext, useState } from "react";

type StepContextType = {
  step: number;
  username: string;
  phone: string;
  setStep: (step: number) => void;
  setUsername: (username: string) => void;
  setPhone: (phone: string) => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export const useStep = (): StepContextType => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};

export const StepProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <StepContext.Provider
      value={{ step, username, phone, setStep, setUsername, setPhone }}
    >
      {children}
    </StepContext.Provider>
  );
};
