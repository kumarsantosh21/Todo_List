import React from "react";
import Zoom from "@mui/material/Zoom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ConfirmDialogbox = ({
  dialogstate,
  handleClose,
  handleConfirmActionClick,
}) => {
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
      onClose={handleClose}
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
          <div>Delete Confirmation</div>
          <IconButton
            sx={{
              borderRadius: "6px",
              "&:hover": {
                color: "rgb(94, 53, 177)",
                background: "rgb(237, 231, 246)",
              },
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography sx={{ marginTop: "20px" }}>
            Are you sure you want to {<b>Delete multiple items</b>}.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={ButtonStyle} variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          sx={ButtonStyle}
          variant="text"
          onClick={handleConfirmActionClick}
        >
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialogbox;
