import React from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import { app } from "../originpages/Client";
import { useLazyQuery, useMutation } from "@apollo/client";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Slide from "@mui/material/Slide";
import MessageLoader from "./MessageLoader";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CreateNewTodo = () => {
  const [state, setState] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [newmessage, setNewmessage] = React.useState();
  const [text, setText] = React.useState();
  const [backdrop, setBackdrop] = React.useState();
  const [title, setTitle] = React.useState();
  const [newtitle, setNewtitle] = React.useState();
  const [titletext, setTitletext] = React.useState();
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
  const [MESSAGES, { mesdata }] = useLazyQuery(GET_MESSAGES, {
    variables: {
      usernam: app.currentUser._profile.data.email,
    },
    onCompleted: (mesdata) => {
      // console.log("mesdatacreatenewtoso", mesdata.data[0].message);

      const data = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.message));
      const title = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.title));

      setMessage(data);
      setTitle(title);
      // console.log(message);
    },
  });

  const [UPDATE_MESSAGES, { loading }] = useMutation(UPDATE_USER_MESSAGES, {
    variables: {
      username: app.currentUser._profile.data.email,
      updates: {
        message: newmessage,
        title: newtitle,
      },
    },
  });

  const handleClick = () => {
    const titrepeated = title.filter((word) => word === titletext);
    const repeated = message.filter((word) => word === text);
    if (repeated.length > 0 || titrepeated.length > 0) {
      setBackdrop(true);
    } else {
      const newtit = [...title, titletext];
      const newme = [...message, text];
      // console.log("newme", newme);
      setNewmessage(newme);
      setNewtitle(newtit);

      setText();
      setState(false);
    }
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
            margin: screenSize >= 1050 ? "200px 200px 200px 250px" : "0px",
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
      {screenSize >= 1050 ? (
        <ClickAwayListener onClickAway={handleClose}>
          <div
            style={{
              display: "flex",
              position: "fixed",
              marginTop: state ? "192px" : "30px",
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
                  width: "780px",
                  padding: "10px 16px 5px 16px",
                  marginLeft: "18%",
                }}
              >
                <TextField
                  autoFocus
                  placeholder="Title"
                  variant="standard"
                  fullWidth
                  onChange={(e) => {
                    setTitletext(e.target.value);
                  }}
                  InputProps={{
                    // disableUnderline: true,
                    sx: { color: "black", fontWeight: "bold" },
                  }}
                />
                <TextField
                  placeholder="Message"
                  variant="standard"
                  rows={10}
                  fullWidth
                  multiline
                  sx={{
                    marginTop: "5px",
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                      backgroundColor: "white",
                      width: "10px",
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb":
                      {
                        borderRadius: 8,
                        backgroundColor: "rgb(237, 231, 246)",
                        minHeight: 24,
                        border: "none",
                      },
                    "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                      {
                        // backgroundColor: "red",
                      },
                    "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                      {
                        // backgroundColor: "red",
                      },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                      {
                        backgroundColor: "rgb(94, 53, 177)",
                        cursor: "unset",
                      },
                    "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner":
                      {
                        // backgroundColor: "#2b2b2b",
                      },
                  }}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  InputProps={{
                    disableUnderline: true,
                    sx: { color: "rgb(94, 53, 177)" },
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    onClick={handleClick}
                    disabled={
                      text === undefined ||
                      text === "" ||
                      titletext === undefined ||
                      titletext === ""
                    }
                    sx={{
                      height: "40px",
                      width: "90px",
                      // marginLeft: "585px",
                      marginRight: "10px",
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
                  <IconButton
                    onClick={() => {
                      setState(false);
                    }}
                    sx={{
                      height: "40px",
                      width: "100px",
                      // marginLeft: "585px",
                      marginRight: "10px",
                      marginBottom: "15px",
                      border: "1px solid rgb(94, 53, 177)",
                      borderRadius: "6px",
                      color: "rgb(94, 53, 177)",
                      "&:hover": {
                        background: "rgb(237, 231, 246)",
                      },
                    }}
                  >
                    Close <CloseIcon sx={{ marginLeft: "5px" }} />
                  </IconButton>
                </div>
              </div>
            </Slide>
          </div>
        </ClickAwayListener>
      ) : null}
      {screenSize < 1050 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 10px 10px",
              border: "2px solid black",
              borderRadius: "8px",
              margin: "20px",
            }}
          >
            <div
              style={{ textAlign: "center", flex: "95%", padding: "10px 20px" }}
            >
              <Typography>Add New Todo</Typography>
              <TextField
                autoFocus
                placeholder="Title"
                variant="standard"
                fullWidth
                onChange={(e) => {
                  setTitletext(e.target.value);
                }}
                sx={{ marginTop: "10px" }}
                InputProps={{
                  // disableUnderline: true,
                  sx: { color: "black", fontWeight: "bold" },
                }}
              />
              <TextField
                placeholder="Message"
                variant="standard"
                fullWidth
                multiline
                rows={3}
                sx={{
                  marginTop: "5px",
                  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                    backgroundColor: "white",
                    width: "10px",
                  },
                  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                    borderRadius: 8,
                    backgroundColor: "rgb(237, 231, 246)",
                    minHeight: 24,
                    border: "none",
                  },
                  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                    {
                      // backgroundColor: "red",
                    },
                  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                    {
                      // backgroundColor: "red",
                    },
                  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                    {
                      backgroundColor: "rgb(94, 53, 177)",
                      cursor: "unset",
                    },
                  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner":
                    {
                      // backgroundColor: "#2b2b2b",
                    },
                }}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                InputProps={{
                  // disableUnderline: true,
                  sx: { color: "rgb(94, 53, 177)" },
                }}
              />
            </div>
            <div
              style={{
                textAlign: "center",
                flex: "5%",
                padding: "10px 20px 20px",
              }}
            >
              <Button
                sx={{
                  marginLeft: "4%",
                  borderRadius: "6px",
                  color: "rgb(94, 53, 177)",
                  "&:hover": {
                    background: "rgb(237, 231, 246)",
                  },
                }}
                onClick={handleClick}
                disabled={
                  text === undefined ||
                  text === "" ||
                  titletext === undefined ||
                  titletext === ""
                }
              >
                Add <AddIcon />
              </Button>
            </div>
          </div>
        </>
      ) : null}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        onClick={() => {
          setBackdrop(false);
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            width: "550px",
            background: "white",
            borderRadius: "10px",
          }}
        >
          <div>
            {" "}
            <Typography
              sx={{
                color: "rgb(94, 53, 177)",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Repeated Title and Messages are not allowed to Add
            </Typography>
            <div
              style={{
                color: "black",
                textAlign: "center",
                paddingTop: "15px",
              }}
            >
              Click anywhere to close Dialogue Box
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
};
export default CreateNewTodo;
