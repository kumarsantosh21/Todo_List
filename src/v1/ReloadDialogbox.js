import React from "react";
import Zoom from "@mui/material/Zoom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ReloadDialogbox = ({ dialogstate, handleReloadClick }) => {
  const ButtonStyle = {
    textTransform: "none",
    margin: "0px 15px",
    borderRadius: "6px",
    color: "rgb(94, 53, 177)",
    fontWeight: 600,
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  return (
    <Dialog
      open={dialogstate}
      TransitionComponent={Zoom}
      keepMounted
      aria-describedby="alert-dialog-zoom-description"
    >
      <DialogTitle
        id="draggable-dialog-title"
        sx={{ background: "rgb(237, 231, 246)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>Data Protection</div>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography sx={{ marginTop: "20px" }}>
            We are reloading this site for every 15 minutes to{" "}
            {<b>prevent from data loss and data disruption</b>}. Thank You for
            Undestanding us.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={ButtonStyle} variant="text" onClick={handleReloadClick}>
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ReloadDialogbox;
