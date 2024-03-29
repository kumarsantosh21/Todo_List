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
import TextField from "@mui/material/TextField";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

function Dahboard() {
  const navigate = useNavigate();
  const [skeleton, setSkeleton] = React.useState();
  const [newData, setNewData] = React.useState();
  const [userData, setUserData] = React.useState();
  const [message, setMessage] = React.useState();
  const [title, setTitle] = React.useState();
  const [searchtext, setSearchtext] = React.useState();
  const [searchtitles, setSearchtitles] = React.useState();
  const [searchmessages, setSearchmessages] = React.useState();
  const [searchiconcolor, setSearchiconcolor] = React.useState("");
  const [createto, setCreateto] = React.useState(false);
  const [screenSize, setScreensize] = React.useState(window.innerWidth);
  const setDimension = () => {
    setScreensize(window.innerWidth);
  };

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

      const data = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.message));
      const title = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.title));

      setMessage(data);
      setSearchmessages(data);
      // console.log(message);
      setTitle(title);
      setSearchtitles(title);
    },
  });

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

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
        title: [],
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
        setCreateto(true);
      }
    }
  }, [skeleton, Fetc, MESSAGES]);
  React.useEffect(() => {
    if (newData !== undefined) {
      UPDATEUSERS();
    }
  }, [newData, UPDATEUSERS]);

  React.useEffect(() => {
    const load = async () => {
      if (userData !== undefined) {
        await INSERT_USER_FOR_DATA();
        setCreateto(true);
        window.location.reload();
      }
    };
    load();
  }, [userData, INSERT_USER_FOR_DATA]);

  React.useEffect(() => {
    if (searchtext !== undefined) {
      const searches = searchtitles.filter((words) =>
        words.includes(searchtext)
      );

      setTitle(searches);

      let sertest = [];
      // finding indexes so we can use messages
      for (let j = 0; j < searches.length; j++) {
        sertest = [
          ...sertest,
          searchtitles.findIndex((element) => element === searches[j]),
        ];
      }
      let filmessages = [];
      // finding messages with indexes
      for (let i = 0; i < searchmessages.length; i++) {
        // console.log(sertest, sertest.includes(i), searchmessages[i]);
        if (sertest.includes(i)) {
          filmessages = [...filmessages, searchmessages[i]];
        }
      }

      setMessage(filmessages);

      // console.log("insidesearchtext", searchtext);
      // console.log("insidetitle", title);
      // console.log("insidemessages", message);
    }
  }, [searchtext, searchtitles]);
  // console.log("outsidesearchtext", searchtext);
  // console.log("outsidetitle", title);
  // console.log("outsidemessages", message);

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
      <Navbar />
      {createto && screenSize >= 1050 ? <CreateNewTodo /> : null}

      <div
        id="total"
        style={{
          margin:
            screenSize >= 1050
              ? "170px 200px 150px 250px"
              : "170px 20px 150px 20px",
          borderRadius: "10px",
          boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
          overflow: "hidden",
        }}
      >
        {createto && screenSize < 1050 ? <CreateNewTodo /> : null}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 10px 10px",
          }}
        >
          <div
            style={{ textAlign: "center", flex: "5%", padding: "10px 20px" }}
          >
            <ContentPasteSearchIcon
              sx={{
                fontSize: "40px",
                cursor: "pointer",
                color: searchiconcolor,
              }}
              onClick={() => {
                document.getElementById("searchfieldtextfield").focus();
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              flex: "95%",
              padding: "10px 20px 20px",
            }}
          >
            <TextField
              id="searchfieldtextfield"
              autoFocus
              fullWidth
              sx={{}}
              placeholder="Search Title...  (* Case Sensitive)"
              variant="standard"
              onChange={(e) => {
                setTitle(searchtitles);
                setMessage(searchmessages);
                setSearchtext(e.target.value);
              }}
              onFocus={() => {
                setSearchiconcolor("rgb(94, 53, 177)");
              }}
              onBlur={() => {
                setSearchiconcolor("");
              }}
            />
          </div>
        </div>

        <div>
          {message !== undefined ? (
            <TodoMessagesMapping messa={message} title={title} />
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
