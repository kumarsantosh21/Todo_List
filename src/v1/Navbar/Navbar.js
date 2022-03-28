import React from "react";
import { DaImg } from "../../assets";
import AppBar from "@mui/material/AppBar";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import NavButton from "./NavButton";
const Navbar = () => {
  const useStyles = makeStyles({
    appbarsy: {},
  });

  const classes = useStyles();
  return (
    <>
      <AppBar
        sx={{
          flexDirection: "row",
          backgroundColor: "white",
          color: "black",
          alignItems: "center",

          borderRadius: "6px",
          width: "98%",
          marginRight: "1%",
          marginTop: "20px",
          boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "2%",
            marginRight: "15px",
            cursor: "pointer",
          }}
        >
          <img src={DaImg} alt="Todo" style={{}} />
          <Typography style={{ fontWeight: "600", fontSize: "20px" }}>
            TODO
          </Typography>
        </div>
        <NavButton />
      </AppBar>
    </>
  );
};
export default Navbar;
