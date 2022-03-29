import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NavButton = ({ Buttonname, colo }) => {
  const navigate = useNavigate();
  const ButtonStyle = {
    textTransform: "none",
    margin: "0px 15px",
    borderRadius: "6px",
    color: window.location.pathname.includes(
      Buttonname.toLowerCase().split(" ").join("")
    )
      ? "rgb(94, 53, 177)"
      : "black",
    fontWeight: window.location.pathname.includes(
      Buttonname.toLowerCase().split(" ").join("")
    )
      ? 600
      : 500,
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  // console.log(Buttonname.toLowerCase().split(" ").join(""));
  const handleClick = () => {
    navigate("/v1/" + Buttonname.toLowerCase().split(" ").join(""));
  };
  return (
    <>
      <Button sx={ButtonStyle} variant="text" onClick={handleClick}>
        {Buttonname}
      </Button>
    </>
  );
};
export default NavButton;
