import React, { createContext, useState } from "react";
import checkundefinednull from "./validators/checkundefinednull";
export const SelectModeContext = createContext();

const SelectModeContextProvider = ({ children }) => {
  let previousMode = false;
  if (typeof Storage !== "undefined") {
    if (!checkundefinednull(localStorage.getItem("mode"))) {
      previousMode = "true" === localStorage.getItem("mode");
    }
  }
  const [mode, setMode] = useState(previousMode);
  const [snackmode, setSnackmode] = useState("initial");
  const handleMode = (value) => {
    setMode(value);
    localStorage.setItem("mode", value);
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
