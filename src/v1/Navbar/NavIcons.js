import React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import ClickAwayListener from "@mui/material/ClickAwayListener";

import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
const NavIcon = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const IconStyle = {
    // "&:hover": {
    //   color: "rgb(94, 53, 177)",
    //   background: "rgb(237, 231, 246)",
    // },
  };
  const ButtonIconStyle = {
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  const MenuStyle = {
    position: "fixed",
    marginLeft: "77%",
    marginTop: "80px",
    background: "white",
    borderRadius: "6px",
    boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
    padding: "15px",
    width: "250px",
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
            >
              <MenuItem onClick={handleClose} sx={MenuListStyle}>
                <div>san</div>
              </MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
};
export default NavIcon;
