import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { SnackbarBody } from ".";
import { cache } from "../../originpages";
import { GET_SNACKBAR_MESSAGE } from "./useSnackbar";
import { gql, useQuery } from "@apollo/client";
import { SelectModeContext } from "../SelectModeContext";

const Snackbar = () => {
  const handleClose = (key) => {
    closeSnackbar(key);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { snack } = cache.readQuery({
    query: GET_SNACKBAR_MESSAGE,
  });
  // console.log(snack);
  const contextValue = useContext(SelectModeContext);
  React.useEffect(() => {
    enqueueSnackbar("what is this", {
      anchorOrigin: { horizontal: "right", vertical: "top" },
      content: () => (
        <div>
          <SnackbarBody
            props={snack}
            handleClose={(ev, reason, key) => {
              closeSnackbar(key);
            }}
          />
        </div>
      ),
      autoHideDuration: 6000,
      onClose: handleClose,
    });
  }, [contextValue.snackmode]);

  return <div></div>;
};
export default Snackbar;
