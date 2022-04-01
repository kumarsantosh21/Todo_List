import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const TodoMessages = ({ messagetext }) => {
  const ButtonIconStyle = {
    // zIndex: "1",
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  // console.log("sep", messagetext);
  return (
    <>
      <div
        disabled
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: "85%", textAlign: "left", cursor: "text" }}>
          {messagetext}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flex: "15%",
            textAlign: "right",
          }}
        >
          <IconButton
            id={messagetext}
            sx={ButtonIconStyle}
            onClick={(e) => {
              console.log(e.currentTarget.id);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            id={messagetext}
            sx={ButtonIconStyle}
            onClick={(e) => {
              console.log(e.currentTarget.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default TodoMessages;
