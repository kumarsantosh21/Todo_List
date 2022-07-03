import React from "react";
import { SnackbarContent } from "notistack";
import { Alert } from "santosh-ui-components";

const SnackbarBody = ({ props, handleClose }) => {
  return (
    <SnackbarContent>
      <Alert
        children={props.message}
        severity={props.severity}
        sx={{
          marginTop: "10px",
          background: "white",
          "& .MuiAlert-action": {
            marginLeft: "20px",
          },
        }}
        onClose={handleClose}
      />
    </SnackbarContent>
  );
};

export default SnackbarBody;
