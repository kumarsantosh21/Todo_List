import React, { createContext, useState } from "react";

export const SelectModeContext = createContext();

const SelectModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(false);
  const [snackmode, setSnackmode] = useState(false);
  const handleMode = (value) => {
    setMode(value);
  };

  const handleSnackMode = () => {
    setSnackmode(!snackmode);
  };

  return (
    <SelectModeContext.Provider
      value={{
        mode,
        setMode,
        handleMode,
        snackmode,
        setSnackmode,
        handleSnackMode,
      }}
    >
      {children}
    </SelectModeContext.Provider>
  );
};

export default SelectModeContextProvider;
