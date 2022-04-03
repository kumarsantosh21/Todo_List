import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import TextField from "@mui/material/TextField";
import { app } from "../originpages/Client";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import Slide from "@mui/material/Slide";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const TodoMessages = ({ messagetext }) => {
  const [state, setState] = React.useState(1);
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
    //  using dom to apply styles is best as far now
    document.getElementById(e.currentTarget.id + "text").disabled = false;
    const text = document.getElementById(e.currentTarget.id + "text");
    text.focus();
    text.select();
    const okiconid = document.getElementById(e.currentTarget.id + "ok");
    // console.log("okiconid", okiconid);
    okiconid.style.display = "unset";
    // console.log("okiconid", okiconid);
    // console.log(e.currentTarget.id);
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
    // setState(false);
  };

  const TooltipColor = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      componentsProps={{ tooltip: { className: className } }}
    />
  ))(`
      color:rgb(94, 53, 177) ;
      background: rgb(237, 231, 246);
      font-size:12px;
      font-weight:bold;
     
  `);

  React.useEffect(() => {
    console.log("length", messagetext.length);

    if (messagetext.length < 93) {
      setState(1);
    } else if (messagetext.length < 93 * 2) {
      setState(2);
    } else if (messagetext.length < 93 * 3) {
      setState(3);
    } else if (messagetext.length < 93 * 4) {
      setState(4);
    } else if (messagetext.length < 93 * 5) {
      setState(5);
    } else {
      setState(6);
    }
  }, [state, messagetext]);
  console.log("state", state);
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
            rows={state}
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
          {/* <TooltipColor
            sx={{
              "& .MuiTooltip-arrow": {
                color: "rgb(237, 231, 246)",
              },
            }}
            arrow
            title="Click to Save"
            TransitionComponent={Zoom}
          > */}
          <IconButton
            id={messagetext + "ok"}
            sx={{ ...ButtonIconStyle, display: "none", margin: "0px" }}
            onClick={handleOk}
          >
            <BookmarkAddedIcon />
          </IconButton>
          {/* </TooltipColor> */}
          <TooltipColor
            sx={{
              "& .MuiTooltip-arrow": {
                color: "rgb(237, 231, 246)",
              },
            }}
            arrow
            title="Edit"
            TransitionComponent={Zoom}
          >
            <IconButton
              id={messagetext}
              sx={ButtonIconStyle}
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
          </TooltipColor>
          <TooltipColor
            sx={{
              "& .MuiTooltip-arrow": {
                color: "rgb(237, 231, 246)",
              },
            }}
            arrow
            title="Delete"
            TransitionComponent={Zoom}
          >
            <IconButton
              id={messagetext}
              sx={ButtonIconStyle}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </TooltipColor>
        </div>
      </div>
    </>
  );
};
export default TodoMessages;
