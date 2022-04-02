import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import TextField from "@mui/material/TextField";
import { app } from "../originpages/Client";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Slide from "@mui/material/Slide";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const TodoMessages = ({ messagetext }) => {
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

  const [UPDATE_MESSAGES] = useMutation(UPDATE_USER_MESSAGES, {
    variables: {
      username: app.currentUser._profile.data.email,
      updates: {
        message: newmessage,
      },
    },
  });
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

  const ButtonIconStyle = {
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  // console.log("sep", messagetext);
  const handleDelete = (e) => {
    // console.log(e.currentTarget.id);
    // placing not deleted words in array
    const notdeleted = message.filter((word) => word !== e.currentTarget.id);
    // if array consits ids more than 2  we should only delete one
    const repeated = message.filter((word) => word === e.currentTarget.id);
    // logic to delete only one
    if (repeated.length > 1) {
      const repeatedvalue = repeated[0];
      // console.log(repeatedvalue);
      const repeatedvaluearray = Array(repeated.length - 1).fill(repeatedvalue);

      // console.log(repeatedvaluearray);
      const notdeletedvalues = [...notdeleted, ...repeatedvaluearray];
      setNewmessage(notdeletedvalues);
    } else {
      // if id is unique then no need of above logic
      const notdeletedvalues = [...notdeleted];
      setNewmessage(notdeletedvalues);
    }
  };
  const handleEdit = (e) => {
    // setState(!state);
    //  using dom to apply styles is best as far now
    document.getElementById(e.currentTarget.id + "text").disabled = false;
    const okiconid = document.getElementById(e.currentTarget.id + "ok");
    // console.log("okiconid", okiconid);
    okiconid.style.display = "unset";
    // console.log("okiconid", okiconid);
    // console.log(e.currentTarget.id);
    const text = document.getElementById(e.currentTarget.id + "text");
    text.focus();
    text.select();
  };
  const handleOk = (e) => {
    // slicing added id
    const presentid = e.currentTarget.id;
    const presentValue = presentid.slice(0, presentid.length - 2);
    console.log(presentValue);
    let valuesNow = message;
    // finding index where to change our to do  message text
    const index = message.indexOf(presentValue);

    if (index !== -1) {
      valuesNow[index] = text;
    }
    // console.log(valuesNow);
    // updating query with the present values
    setNewmessage(valuesNow);
  };

  const clickAwayClose = () => {
    setState(false);
  };

  // React.useEffect((e) => {

  // }, []);
  return (
    <>
      <div
        disabled
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ flex: "80%", textAlign: "left", cursor: "text" }}>
          <TextField
            id={messagetext + "text"}
            autoFocus
            fullWidth
            disabled
            multiline
            rows={messagetext.length < 5 ? 2 : 1}
            variant="standard"
            defaultValue={messagetext}
            onChange={(e) => {
              setText(e.target.value);
              console.log(e.target.value);
            }}
            InputProps={{
              disableUnderline: true,
              sx: {
                "& .MuiInputBase-input.Mui-disabled": {
                  WebkitTextFillColor: "rgb(94, 53, 177)",
                  cursor: "text",
                },
              },
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flex: "20%",
            textAlign: "right",
          }}
        >
          <IconButton
            id={messagetext + "ok"}
            // disabled
            sx={{ ...ButtonIconStyle, display: "none", margin: "0px" }}
            onClick={handleOk}
          >
            <BookmarkAddedIcon />
          </IconButton>
          <IconButton
            id={messagetext}
            sx={ButtonIconStyle}
            onClick={handleEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            id={messagetext}
            sx={ButtonIconStyle}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default TodoMessages;
