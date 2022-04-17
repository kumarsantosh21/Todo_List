import React from "react";
import { DaImg } from "../../assets";
import AppBar from "@mui/material/AppBar";
// import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import NavButtonMapper from "./NavButtonMapper";
import NavIcon from "./NavIcons";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "./SettingsIcon";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { app } from "../../originpages";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [screenSize, setScreensize] = React.useState(window.innerWidth);
  const setDimension = () => {
    setScreensize(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  const IconStyle = {};
  const ButtonIconStyle = {
    marginLeft: "4%",
    borderRadius: "6px",
    color: "rgb(94, 53, 177)",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
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
          backdropFilter: "blur(10px)",
          zIndex: "1",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        {screenSize < 1050 ? (
          <div style={{ flex: "5%" }}>
            <IconButton
              sx={ButtonIconStyle}
              onClick={() => {
                setOpen(true);
              }}
            >
              <MenuIcon sx={IconStyle} />
            </IconButton>
          </div>
        ) : null}
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
        {screenSize >= 1050 ? (
          <>
            {" "}
            <div style={{ flex: "40%", textAlign: "left" }}>
              <NavButtonMapper />
            </div>
            <div
              style={{ flex: "15%", textAlign: "right", marginRight: "30px" }}
            >
              <NavIcon />
            </div>
            <SettingsIcon />
          </>
        ) : null}
        <SwipeableDrawer
          anchor={"left"}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          // onClose={toggleDrawer(anchor, false)}
          // onOpen={toggleDrawer(anchor, true)}
        >
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
            style={{ marginLeft: "auto" }}
            sx={{
              ...ButtonIconStyle,
              margin: "10px",
              width: "40px",
              color: "black",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Divider />
          <div style={{ display: "grid", margin: "20px" }}>
            <NavButtonMapper />
          </div>
          <div></div>
          <Button
            sx={{ ...ButtonIconStyle, textTransform: "none" }}
            style={{ position: "fixed", bottom: "5px", margin: "20px" }}
            variant="text"
            onClick={() => {
              setOpen(false);
              app.currentUser.logOut();
              navigate("/");
              window.location.reload();
            }}
          >
            <LogoutIcon sx={{ marginRight: "13px" }} /> Logout
          </Button>
        </SwipeableDrawer>
      </AppBar>
    </>
  );
};
export default Navbar;
