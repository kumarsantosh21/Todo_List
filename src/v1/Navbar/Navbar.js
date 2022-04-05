import React from "react";
import { DaImg } from "../../assets";
import AppBar from "@mui/material/AppBar";
// import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import NavButtonMapper from "./NavButtonMapper";
import NavIcon from "./NavIcons";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "./SettingsIcon";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        sx={{
          display: "flex",
          position: "fixed",
          flexDirection: "row",
          background: "rgba(255,255,255,0.7)",
          color: "black",
          alignItems: "center",
          borderRadius: "10px",
          width: "96%",
          marginRight: "2%",
          marginTop: "20px",
          boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
          height: "85px",
          backdropFilter: "blur(20px)",
          zIndex: "1",
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
          onClick={() => {
            navigate("/v1/dashboard");
          }}
        >
          <img src={DaImg} alt="Todo" style={{}} />
          <Typography style={{ fontWeight: "600", fontSize: "20px" }}>
            TODO
          </Typography>
        </div>
        <div style={{ flex: "40%", textAlign: "left" }}>
          <NavButtonMapper />
        </div>
        <div style={{ flex: "15%", textAlign: "right", marginRight: "30px" }}>
          <NavIcon />
        </div>
        <SettingsIcon />
      </AppBar>
      {/* <div style={{ fontSize: "30px", marginTop: "200px" }}>
        {data.customer.name}
      </div> */}
    </>
  );
};
export default Navbar;
