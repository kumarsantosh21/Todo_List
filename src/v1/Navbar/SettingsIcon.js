import React, { useContext } from "react";
import SettinIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import CheckboxModeSelect from "../CheckboxModeSelect";
import { SelectModeContext } from "../SelectModeContext";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const Keyframes = styled("span")({
  "@keyframes spin": {
    " 0% ": { transform: " rotate(0deg)" },
    "100%": { transform: " rotate(360deg)" },
  },
  animation: "spin 2s  infinite ease-out",
});

const SettingsIcon = () => {
  const [open, setOpen] = React.useState(false);
  const ButtonSettingsIconStyle = {
    color: "rgb(94, 53, 177)",
    background: "rgb(237, 231, 246)",
    position: "fixed",
    borderRadius: "50% 50% 4px;",
    marginTop: "35%",
    padding: "12px",
    marginLeft: "96%",
    zIndex: "1",
    border: "2px solid rgb(94, 53, 177)",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  const contextValue = useContext(SelectModeContext);
  const handleModeClick = (e) => {
    if (e.target.checked) {
      contextValue.setMode(true);
    } else {
      contextValue.setMode(false);
    }
  };
  const handleSwipableDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        sx={ButtonSettingsIconStyle}
        onClick={() => {
          setOpen(true);
        }}
      >
        {" "}
        <Keyframes>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SettinIcon />
          </div>
        </Keyframes>
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        // onClose={toggleDrawer(anchor, false)}
        // onOpen={toggleDrawer(anchor, true)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <Typography style={{ fontWeight: "600", fontSize: "20px" }}>
            Settings
          </Typography>
          <IconButton
            sx={{
              marginLeft: "200px",
              borderRadius: "6px",
              "&:hover": {
                color: "rgb(94, 53, 177)",
                background: "rgb(237, 231, 246)",
              },
            }}
            onClick={handleSwipableDrawerClose}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <CheckboxModeSelect
          handleModeClick={handleModeClick}
          label={contextValue.mode}
        />
      </SwipeableDrawer>
    </>
  );
};
export default SettingsIcon;
