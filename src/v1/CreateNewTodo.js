import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import { app } from "../originpages/Client";
import { useLazyQuery, useMutation } from "@apollo/client";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Slide from "@mui/material/Slide";
import MessageLoader from "./MessageLoader";

const CreateNewTodo = () => {
  const [state, setState] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [newmessage, setNewmessage] = React.useState();
  const [text, setText] = React.useState();

  const [MESSAGES, { mesdata }] = useLazyQuery(GET_MESSAGES, {
    variables: {
      usernam: app.currentUser._profile.data.email,
    },
    onCompleted: (mesdata) => {
      // console.log("mesdatacreatenewtoso", mesdata.data[0].message);

      const data = JSON.parse(JSON.stringify(mesdata.data[0].message));

      setMessage(data);
      // console.log(message);
    },
  });

  const [UPDATE_MESSAGES, { loading }] = useMutation(UPDATE_USER_MESSAGES, {
    variables: {
      username: app.currentUser._profile.data.email,
      updates: {
        message: newmessage,
      },
    },
  });

  const handleClick = () => {
    setState(false);
    const newme = [...message, text];
    // console.log("newme", newme);
    setNewmessage(newme);
    setText();
  };

  React.useEffect(() => {
    MESSAGES();
  }, [MESSAGES]);

  React.useEffect(() => {
    const test = async () => {
      if (newmessage !== undefined) {
        await UPDATE_MESSAGES();
        MESSAGES();
      }
    };
    test();
  }, [newmessage, UPDATE_MESSAGES, MESSAGES]);

  const floatingStyle = {
    background: "white",
    borderRadius: "6px",
    border: "2px solid rgb(94, 53, 177)",
    color: "rgb(94, 53, 177)",
    boxShadow: "none",
    width: "200px",
    height: "auto",
    marginTop: "60%",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
      boxShadow: "none",
    },
  };
  const handleClose = () => {
    // console.log("onclickaway");
    setState(false);
  };
  React.useEffect(() => {
    if (state === true) {
      document.getElementById("total").style.display = "none";
    } else {
      document.getElementById("total").style.display = "";
    }
  }, [state]);
  if (loading) {
    return (
      <>
        <div
          style={{
            margin: "200px 200px 200px 250px",
            borderRadius: "10px",
            boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
            overflow: "hidden",
          }}
        >
          <div>
            <MessageLoader />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <div
          style={{
            display: "flex",
            position: "fixed",
            width: "100%",
            marginTop: state ? "192px" : "",
          }}
        >
          {" "}
          <div style={{}}>
            <div>
              <Fab
                color="primary"
                variant="extended"
                sx={{ ...floatingStyle, height: "none" }}
                onClick={() => {
                  setState(!state);
                }}
              >
                Add New List <AddIcon sx={{ marginLeft: "5px" }} />
              </Fab>
            </div>
          </div>
          <Slide direction="left" in={state} mountOnEnter unmountOnExit>
            <div
              style={{
                border: "2px solid rgb(94, 53, 177)",
                color: "rgb(94, 53, 177)",
                background: "white",
                borderRadius: "6px",
                zIndex: "1",
                width: "680px",
                padding: "5px 16px",
                marginLeft: "8%",
              }}
            >
              <TextField
                autoFocus
                variant="standard"
                rows={10}
                fullWidth
                multiline
                onChange={(e) => {
                  setText(e.target.value);
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: { color: "rgb(94, 53, 177)" },
                }}
              />
              <IconButton
                onClick={handleClick}
                disabled={text === undefined || text === ""}
                sx={{
                  height: "40px",
                  width: "90px",
                  marginLeft: "585px",
                  marginBottom: "15px",
                  border: "1px solid rgb(94, 53, 177)",
                  borderRadius: "6px",
                  color: "rgb(94, 53, 177)",
                  "&:hover": {
                    background: "rgb(237, 231, 246)",
                  },
                }}
              >
                Add <AddIcon sx={{ marginLeft: "5px" }} />
              </IconButton>
            </div>
          </Slide>
        </div>
      </ClickAwayListener>
    </>
  );
};
export default CreateNewTodo;
