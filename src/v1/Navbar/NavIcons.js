import React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { app } from "../../originpages";
import { useNavigate } from "react-router-dom";
const NavIcon = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleCloseLogout = () => {
    setOpen(false);
    app.currentUser.logOut();
    navigate("/");
    window.location.reload();
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const IconStyle = {};
  const ButtonIconStyle = {
    borderRadius: "6px",
    color: open ? "rgb(94, 53, 177)" : "",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  const MenuStyle = {
    position: "fixed",
    marginLeft: "83%",
    marginTop: "95px",
    background: "white",
    borderRadius: "6px",
    boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
    padding: "15px",
    width: "13%",
    overflowX: "hidden",
    maxHeight: "150px",
    overflowY: "auto",
  };
  const MenuListStyle = {
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  return (
    <>
      <IconButton sx={ButtonIconStyle} onClick={handleToggle}>
        <AccountCircleIcon sx={IconStyle} />
      </IconButton>
      <Popper
        open={open}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={open}
              onKeyDown={handleListKeyDown}
              sx={MenuStyle}
              selected={true}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                }}
                sx={MenuListStyle}
              >
                <Avatar sx={{ width: 24, height: 24, marginRight: "13px" }}>
                  A
                </Avatar>{" "}
                Account
              </MenuItem>
              <MenuItem onClick={handleCloseLogout} sx={MenuListStyle}>
                <LogoutIcon sx={{ marginRight: "13px" }} />
                Logout
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};
export default NavIcon;
