import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { app } from "../originpages/Client";
import { useNavigate } from "react-router-dom";
import { NoResults, Loading } from "../assets/Loaders";
import Navbar from "./Navbar/Navbar";
import Footer from "./Navbar/Footer";
import {
  GET_USERS,
  INSERT_USER_MAIN,
  INSERT_NEW_USER_FOR_DATA,
  GET_MESSAGES,
  UPDATE_USER_NAME_BACKUP,
} from "./graphql";
import CreateNewTodo from "./CreateNewTodo";
import MessageLoader from "./MessageLoader";
import TodoMessagesMapping from "./TodoMessagesMapping";
import TextField from "@mui/material/TextField";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import checkundefinednull from "./validators/checkundefinednull";
import ReloadDialogbox from "./ReloadDialogbox";
import hashCode from "./Hashingstring";
import SelectModeContextProvider from "./SelectModeContext";
import { SnackbarProvider } from "notistack";
import { Snackbar, useSnackbar } from "./Snackbar";
import { Alert } from "santosh-ui-components";
import BackupPage from "./Backup and Restore Pages/BackupPage";
import RestorePage from "./Backup and Restore Pages/RestorePage";
import CompletedPage from "./Backup and Restore Pages/CompletedPage";
import NoFileFound from "./Backup and Restore Pages//NoFileFound";
import Button from "@mui/material/Button";
import moment from "moment";
import BackupIcon from "@mui/icons-material/Backup";
import RestoreIcon from "@mui/icons-material/Restore";

function Dahboard() {
  const navigate = useNavigate();
  if (checkundefinednull(app?.currentUser?._profile?.data?.email)) {
    window.location.pathname = "/login";
  }
  // useSnackbar(`Welcome ${app?.currentUser?._profile?.data?.email}`, "info");
  document.title = "Notepad - Dashboard";
  // eslint-disable-next-line no-undef
  const userid = BigInt(
    hashCode(app?.currentUser?._profile?.data?.email)
  ).toString();

  const ButtonStyle = {
    textTransform: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    color: "rgb(94, 53, 177)",
    fontWeight: 600,
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  const [skeleton, setSkeleton] = React.useState();
  const [backupstatus, setBackupstatus] = React.useState();
  const [newData, setNewData] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [message, setMessage] = React.useState();
  const [title, setTitle] = React.useState();
  const [searchtext, setSearchtext] = React.useState();
  const [searchtitles, setSearchtitles] = React.useState();
  const [searchmessages, setSearchmessages] = React.useState();
  const [searchiconcolor, setSearchiconcolor] = React.useState("");
  const [createto, setCreateto] = React.useState(false);
  const [screenSize, setScreensize] = React.useState(window.innerWidth);
  const [date, setDate] = React.useState();
  const [searchdate, setSearchdate] = React.useState();
  const [reloadstate, setReloadstate] = React.useState(false);
  const setDimension = () => {
    setScreensize(window.innerWidth);
  };

  // For fetching first user or  old user
  const [Fetc, { loading, error, data }] = useLazyQuery(GET_USERS, {
    variables: {
      usernam: userid,
    },
    onCompleted: (data) => {
      // console.log("oncomplete", data);
      const incomingdata = JSON.parse(JSON.stringify(data));
      // incomingdata.user_name.user[0] = "santesting";
      // console.log("incoming", incomingdata);
      setSkeleton(incomingdata);
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [UPDATE_CLOUD, {}] = useMutation(UPDATE_USER_NAME_BACKUP, {
    onCompleted: () => {
      Fetc();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  // Fetching messages of the user if user exists
  const [MESSAGES, { mesdata }] = useLazyQuery(GET_MESSAGES, {
    variables: {
      usernam: userid,
    },
    onCompleted: (mesdata) => {
      // console.log("mesdata", mesdata);
      const bkupstatus = JSON.parse(
        JSON.stringify(mesdata?.data?.[0]?.backupstatus)
      );
      const data = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.message));
      const title = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.title));
      const date = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.lastmodified));

      setMessage(data);
      setSearchmessages(data);
      setDate(date);
      setSearchdate(date);
      // console.log(message);
      setTitle(title);
      setSearchtitles(title);
      setBackupstatus(bkupstatus);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  // insert cloud data if the user logins for the first time
  const [INSERT_USER_CLOUD] = useMutation(INSERT_USER_MAIN, {
    variables: {
      datas: {
        username: userid,
        accesstoken: "",
        docid: "",
        accountstatus: "newaccount",
        backupstatus: "",
        lastbackupdate: "",
        lastrestoredate: "",
        restorestatus: "",
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
        lastmodified: [],
        backupstatus: "",
      },
    },
  });
  React.useEffect(() => {
    if (userid) {
      Fetc();
    }

    if (skeleton) {
      if (skeleton?.user_name?.username) {
        MESSAGES();
        setCreateto(true);
      } else {
        setNewData(true);
        setUserData(userid);
      }
    }
  }, [skeleton, userid]);
  React.useEffect(() => {
    if (newData && userid) {
      INSERT_USER_CLOUD();
    } else {
      console.log("user not found");
    }
  }, [newData]);

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
  // autofill search word if present in url
  const params = new URLSearchParams(window.location.search);
  let searchValue = params.get("searchKey");
  React.useEffect(() => {
    if (!checkundefinednull(searchValue)) {
      setSearchtext(searchValue);
    }
  }, []);
  React.useEffect(() => {
    if (!checkundefinednull(searchtext)) {
      const searches = searchtitles?.filter((words) =>
        words?.includes(searchtext)
      );

      const newsearchmessages = searchmessages?.filter((words) =>
        words?.includes(searchtext)
      );

      // console.log(searchmessages);
      let messageindexes = [];
      // finding indexes so we can use messages
      for (let j = 0; j < newsearchmessages?.length; j++) {
        messageindexes = [
          ...messageindexes,
          searchmessages.findIndex(
            (element) => element === newsearchmessages[j]
          ),
        ];
      }
      // console.log(messageindexes);
      let titleindexs = [];
      // finding indexes so we can use messages
      for (let j = 0; j < searches?.length; j++) {
        titleindexs = [
          ...titleindexs,
          searchtitles.findIndex((element) => element === searches[j]),
        ];
      }
      // console.log(titleindexs);

      let sertest = [...new Set([...titleindexs, ...messageindexes])];

      // console.log(sertest);

      let filtitle = [];
      // finding messages with indexes
      for (let i = 0; i < searchtitles?.length; i++) {
        // console.log(sertest, sertest.includes(i), searchmessages[i]);
        if (sertest.includes(i)) {
          filtitle = [...filtitle, searchtitles[i]];
        }
      }

      setTitle(filtitle);
      let filmessages = [];
      // finding messages with indexes
      for (let i = 0; i < searchmessages?.length; i++) {
        // console.log(sertest, sertest.includes(i), searchmessages[i]);
        if (sertest.includes(i)) {
          filmessages = [...filmessages, searchmessages[i]];
        }
      }

      setMessage(filmessages);

      let fildate = [];
      // finding messages with indexes
      for (let i = 0; i < searchdate?.length; i++) {
        // console.log(sertest, sertest.includes(i), searchdate[i]);
        if (sertest.includes(i)) {
          fildate = [...fildate, searchdate[i]];
        }
      }

      setDate(fildate);
      // console.log(fildate);
      // console.log("insidesearchtext", searchtext);
      // console.log("insidetitle", title);
      // console.log("insidemessages", message);
    }
  }, [searchtext, searchtitles]);
  // console.log("outsidesearchtext", searchtext);
  // console.log("outsidetitle", title);
  // console.log("outsidemessages", message);

  // React.useEffect(() => {
  //   // calling dialog to prevent from data duplication
  //   setTimeout(() => {
  //     setReloadstate(true);
  //   }, 900000);
  // }, []);

  // getting token for backup
  const backupAndRestoreFunction = (status) => {
    if (skeleton) {
      if (userid && localStorage.getItem("docaccesstoken")) {
        const accesstoken = JSON.parse(localStorage.getItem("docaccesstoken"));

        UPDATE_CLOUD({
          variables: {
            username: userid,
            updates: {
              [status]: "initiated",
              accesstoken: accesstoken?.access_token,
            },
          },
        });
        localStorage.removeItem("docaccesstoken");
        window["handleGoogleRevoke"]();
      } else {
        window["handleAuthClick"](status);
      }
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    console.log(error);
    if (error.toString().includes("status code 401")) {
      app.currentUser.logOut();
      navigate("/");
      window.location.reload();
    }
    return (
      <Alert
        children="Something went Wrong"
        hasAction
        actionText="Reload"
        actionButtonFunciton={() => {
          window.location.reload();
        }}
      />
    );
  }
  // console.log(data);
  // console.log("skeleton", skeleton);
  // console.log("outsidenew", newData);
  // console.log("message", message);
  const handleReloadClick = () => {
    window.location.reload();
  };

  const textMapper = {
    "": "Welcome to Notepad application",
    0: "Recent Changes not backedup . Please back it up to prevent Data Loss",
    1: "Your Data is Backedup upto now",
  };

  if (skeleton?.user_name?.backupstatus === "initiated") {
    return <BackupPage />;
  } else if (skeleton?.user_name?.restorestatus === "initiated") {
    return <RestorePage />;
  } else if (skeleton?.user_name?.backupstatus === "completed") {
    return (
      <CompletedPage completedText={"Backup"} state={"B"} getUsers={Fetc} />
    );
  } else if (skeleton?.user_name?.restorestatus === "completed") {
    return (
      <CompletedPage completedText={"Restore"} state={"R"} getUsers={Fetc} />
    );
  } else if (skeleton?.user_name?.backupstatus === "not found") {
    return <NoFileFound completedText={"Backup"} state={"B"} />;
  } else if (skeleton?.user_name?.restorestatus === "not found") {
    return <NoFileFound completedText={"Restore"} state={"R"} />;
  } else if (
    skeleton?.user_name?.backupstatus !== "" ||
    skeleton?.user_name?.restorestatus !== ""
  ) {
    return (
      <>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
            {skeleton?.user_name?.backupstatus}
          </div>
          <div style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
            {skeleton?.user_name?.restorestatus}
          </div>
          <div>
            please contact <b>santoorvlss4321@gmail.com</b> to solve the above
            error.
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SelectModeContextProvider>
        <SnackbarProvider maxSnack={3}>
          <Snackbar />
          <Navbar />

          {createto && screenSize >= 1050 ? <CreateNewTodo /> : null}
          <div
            id="total"
            style={{
              margin:
                screenSize >= 1050
                  ? "170px 120px 150px 250px"
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
                style={{
                  textAlign: "center",
                  flex: "5%",
                  padding: "10px 20px",
                }}
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
                  fullWidth
                  InputProps={{
                    // disableUnderline: true,
                    sx: { color: "black", fontWeight: "bold" },
                  }}
                  placeholder="Search Title or Message...  (* Case Sensitive)"
                  variant="standard"
                  defaultValue={searchValue}
                  onChange={(e) => {
                    setTitle(searchtitles);
                    setMessage(searchmessages);
                    setDate(searchdate);
                    setSearchtext(e.target.value);
                    if (checkundefinednull(e.target.value)) {
                      params.delete("searchKey");
                    } else {
                      params.set("searchKey", e.target.value);
                    }
                    window.history.pushState({}, "", `?${params.toString()}`);
                    // console.log(window.location.search);
                  }}
                  onFocus={() => {
                    setSearchiconcolor("rgb(94, 53, 177)");
                  }}
                  onBlur={() => {
                    setSearchiconcolor("");
                  }}
                />
              </div>
              {backupstatus === "0" ? (
                <Button
                  sx={ButtonStyle}
                  id="startBackupFunction"
                  onClick={() => {
                    backupAndRestoreFunction("backupstatus");
                  }}
                >
                  Backup&nbsp; <BackupIcon />
                </Button>
              ) : null}
              {skeleton?.user_name?.lastbackupdate !== "" ? (
                <Button
                  sx={ButtonStyle}
                  id="startRestoreFunction"
                  onClick={() => {
                    backupAndRestoreFunction("restorestatus");
                  }}
                >
                  Restore&nbsp; <RestoreIcon />
                </Button>
              ) : null}
            </div>
            <div
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  padding:"25px"
                }}
              >
               Notepad app's use and transfer of information received from Google APIs to any other app will adhere 
               to <a target="_blank" href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </div>
            {backupstatus !== undefined ? (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {textMapper[backupstatus]}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                loading...
              </div>
            )}
            <div
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {skeleton?.user_name?.lastbackupdate && (
                <div>
                  Last backedup at &nbsp;
                  {moment
                    .utc(skeleton?.user_name?.lastbackupdate)
                    .local()
                    .format("MMMM Do YYYY, h:mm a")}
                </div>
              )}
              {skeleton?.user_name?.lastrestoredate && (
                <div>
                  Last restored at &nbsp;
                  {moment
                    .utc(skeleton?.user_name?.lastrestoredate)
                    .local()
                    .format("MMMM Do YYYY, h:mm a")}
                </div>
              )}
            </div>
            <div>
              {checkundefinednull(message) ||
              checkundefinednull(title) ||
              checkundefinednull(date) ? (
                <MessageLoader />
              ) : message?.length !== 0 &&
                title?.length !== 0 &&
                date?.length !== 0 ? (
                <TodoMessagesMapping
                  messa={message}
                  title={title}
                  lastmodifieddate={date}
                />
              ) : (
                <NoResults />
              )}
            </div>
          </div>

          <div
            id="dashboard_loading"
            style={{
              margin: "200px 30px 50px 30px",
              borderRadius: "10px",
              boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
              overflow: "hidden",
              display: "none",
            }}
          >
            <div>
              <MessageLoader />
            </div>
          </div>

          <ReloadDialogbox
            dialogstate={reloadstate}
            handleReloadClick={handleReloadClick}
          />
          <Footer />
        </SnackbarProvider>
      </SelectModeContextProvider>
    </>
  );
}
export default Dahboard;
