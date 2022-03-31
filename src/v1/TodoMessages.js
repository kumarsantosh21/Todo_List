import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const TodoMessages = ({ messagetext }) => {
  const ButtonIconStyle = {
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  console.log("sep", messagetext);
  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        }}
      >
        <div style={{ flex: "85%", textAlign: "left" }}>{messagetext}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flex: "15%",
            textAlign: "right",
          }}
        >
          <IconButton sx={ButtonIconStyle}>
            <EditIcon />
          </IconButton>
          <IconButton sx={ButtonIconStyle}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default TodoMessages;
