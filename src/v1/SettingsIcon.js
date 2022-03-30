import React from "react";
import SettinIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const Keyframes = styled("span")({
  "@keyframes spin": {
    " 0% ": { transform: " rotate(0deg)" },
    "100%": { transform: " rotate(360deg)" },
  },
  animation: "spin 2s  infinite ease-out",
});

const SettingsIcon = () => {
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
  return (
    <>
      <IconButton sx={ButtonSettingsIconStyle} onClick={() => {}}>
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
    </>
  );
};
export default SettingsIcon;
