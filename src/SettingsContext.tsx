import React, { createContext, useState } from "react";

interface ISettingsContext {
  initialTime: number;
  setInitialTime: (time: number) => void;
}

export const SettingsContext = createContext({} as ISettingsContext);
const SettingsProvider: React.FC = ({ children }: any) => {
  const [initialTime, setInitialTime] = useState(10);

  const value = {
    initialTime,
    setInitialTime,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
