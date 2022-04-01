import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import TextField from "@mui/material/TextField";
import { app } from "../originpages/Client";

const TodoMessages = ({ messagetext }) => {
  const [message, setMessage] = React.useState();
  const [newmessage, setNewmessage] = React.useState();

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
    // zIndex: "1",
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  // console.log("sep", messagetext);
  const handleDelete = (e) => {
    console.log(e.currentTarget.id);
    const notdeleted = message.filter((word) => word !== e.currentTarget.id);
    const repeated = message.filter((word) => word === e.currentTarget.id);
    if (repeated.length > 1) {
      const repeatedvalue = repeated[0];
      console.log(repeatedvalue);
      const repeatedvaluearray = Array(repeated.length - 1).fill(repeatedvalue);

      console.log(repeatedvaluearray);
      const notdeletedvalues = [...notdeleted, ...repeatedvaluearray];
      setNewmessage(notdeletedvalues);
    } else {
      const notdeletedvalues = [...notdeleted];
      setNewmessage(notdeletedvalues);
    }
  };
  const handleEdit = (e) => {
    console.log(e.currentTarget.id);
  };
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
        <div style={{ flex: "85%", textAlign: "left", cursor: "text" }}>
          {messagetext}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            flex: "15%",
            textAlign: "right",
          }}
        >
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
