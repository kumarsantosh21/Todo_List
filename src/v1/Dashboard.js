import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { app } from "../originpages/Client";
import { useNavigate } from "react-router-dom";
import { Loading } from "../assets/Loaders";
import Navbar from "./Navbar/Navbar";
import Footer from "./Navbar/Footer";
import {
  GET_USERS,
  UPDATE_USERS,
  INSERT_NEW_USER_FOR_DATA,
  GET_MESSAGES,
} from "./graphql";
import CreateNewTodo from "./CreateNewTodo";
import MessageLoader from "./MessageLoader";
import TodoMessagesMapping from "./TodoMessagesMapping";

function Dahboard() {
  const navigate = useNavigate();
  const [skeleton, setSkeleton] = React.useState();
  const [newData, setNewData] = React.useState();
  const [userData, setUserData] = React.useState();
  const [message, setMessage] = React.useState();

  // For fetching first user or  old user
  const [Fetc, { loading, error, data }] = useLazyQuery(GET_USERS, {
    onCompleted: (data) => {
      // console.log("oncomplete", data);
      const incomingdata = JSON.parse(JSON.stringify(data));
      // incomingdata.user_name.user[0] = "santesting";
      // console.log("incoming", incomingdata);
      setSkeleton(incomingdata);
    },
  });
  // Fetching messages of the user if user exists
  const [MESSAGES, { mesdata }] = useLazyQuery(GET_MESSAGES, {
    variables: {
      usernam: app.currentUser._profile.data.email,
    },
    onCompleted: (mesdata) => {
      // console.log("mesdata", mesdata.data[0].message);

      const data = JSON.parse(JSON.stringify(mesdata.data[0].message));

      setMessage(data);
      // console.log(message);
    },
  });
  // update user if the user logins for the first time
  const [UPDATEUSERS] = useMutation(UPDATE_USERS, {
    variables: {
      cloud: "mongo",
      updates: {
        user: newData,
      },
    },
  });
  // inserting data for the first time user login
  const [INSERT_USER_FOR_DATA] = useMutation(INSERT_NEW_USER_FOR_DATA, {
    variables: {
      datas: {
        username: userData,
        message: [],
      },
    },
  });
  React.useEffect(() => {
    Fetc();
    if (skeleton !== undefined) {
      const name = skeleton.user_name.user;
      if (!name.includes(app.currentUser._profile.data.email)) {
        const db = [...name, app.currentUser._profile.data.email];
        setNewData(db);
        setUserData(app.currentUser._profile.data.email);
      } else {
        MESSAGES();
      }
    }
  }, [skeleton, Fetc, MESSAGES]);
  React.useEffect(() => {
    if (newData !== undefined) {
      UPDATEUSERS();
    }
  }, [newData, UPDATEUSERS]);

  React.useEffect(() => {
    if (userData !== undefined) {
      INSERT_USER_FOR_DATA();
    }
  }, [userData, INSERT_USER_FOR_DATA]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <div>encountered an error</div>;
  }
  // console.log(data);
  // console.log("skeleton", skeleton);
  // console.log("outsidenew", newData);
  // console.log("message", message);

  return (
    <>
      {" "}
      <Navbar />
      <CreateNewTodo />
      <div
        id="total"
        style={{
          margin: "170px 200px 150px 250px",
          borderRadius: "10px",
          boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
          overflow: "hidden",
        }}
      >
        <div>
          {message !== undefined ? (
            <TodoMessagesMapping messa={message} />
          ) : (
            <MessageLoader />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Dahboard;
