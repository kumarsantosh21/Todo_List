import React, { createContext, useState } from "react";

export const SelectModeContext = createContext();

const SelectModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(false);
  const handleMode = (value) => {
    setMode(value);
  };

  return (
    <SelectModeContext.Provider
      value={{
        mode,
        setMode,
        handleMode,
      }}
    >
      {children}
    </SelectModeContext.Provider>
  );
};

export default SelectModeContextProvider;
