import React from "react";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
const NavButton = ({ Buttonname }) => {
  // const ButtonSty = styled("Button")(({ theme }) => ({}));
  const ButtonStyle = {
    color: "black",
    textTransform: "none",
    margin: "0px 15px",
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  return (
    <>
      <Button sx={ButtonStyle} variant="text">
        {Buttonname}
      </Button>
    </>
  );
};
export default NavButton;
