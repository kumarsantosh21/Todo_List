import React, { useContext } from "react";
import { SelectModeContext } from "./SelectModeContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useLazyQuery, useMutation } from "@apollo/client";
import { UPDATE_USER_MESSAGES, GET_MESSAGES } from "./graphql";
import { app } from "../originpages/Client";
import SaveIcon from "@mui/icons-material/Save";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import SingleMessageLoader from "./SingleMessageLoader";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled } from "@mui/material/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import moment from "moment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import hashCode from "./Hashingstring";
import UseSnackbar from "./Snackbar/useSnackbar";

const TodoMessages = ({ messagetext, title, recentupdateddate }) => {
  const tolocaldate = moment
    .utc(recentupdateddate)
    .local()
    .format("MMMM Do YYYY, h:mm a");
  // moment.utc(recentupdateddate).local().format("MMMM Do YYYY, h:mm:ss a");

  // eslint-disable-next-line no-undef
  const userid = BigInt(
    hashCode(app?.currentUser?._profile?.data?.email)
  ).toString();

  const contextValue = useContext(SelectModeContext);

  const [expand, setExpand] = React.useState(3);
  const [message, setMessage] = React.useState();
  const [newmessage, setNewmessage] = React.useState();
  const [text, setText] = React.useState();
  const [copy, setCopy] = React.useState("Copy to Clipboard");
  const [dis, setDis] = React.useState(true);
  const [backdrop, setBackdrop] = React.useState();
  const [titles, setTitles] = React.useState();
  const [newtitle, setNewtitle] = React.useState();
  const [manualLoading, setManualLoading] = React.useState();
  const [newdate, setNewdate] = React.useState();
  const [date, setDate] = React.useState();
  const [MESSAGES, { mesdata }] = useLazyQuery(GET_MESSAGES, {
    variables: {
      usernam: userid,
    },
    onCompleted: (mesdata) => {
      // console.log("mesdatacreatenewtoso", mesdata.data[0].message);

      const data = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.message));
      const tit = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.title));
      const date = JSON.parse(JSON.stringify(mesdata?.data?.[0]?.lastmodified));
      setDate(date);
      setMessage(data);
      // console.log(message);
      setTitles(tit);
    },
  });

  const [UPDATE_MESSAGES, { loading }] = useMutation(UPDATE_USER_MESSAGES, {
    variables: {
      username: userid,
      updates: {
        message: newmessage,
        title: newtitle,
        lastmodified: newdate,
      },
    },
    onCompleted: () => {
      contextValue.handleSnackMode(!contextValue.snackmode);
      setManualLoading(true);
      setTimeout(() => {
        setManualLoading(false);
      }, 1000);
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
    color: contextValue.mode ? "white" : "black",
    "&:hover": {
      color: contextValue.mode ? "black" : "rgb(94, 53, 177)",
      background: contextValue.mode ? "white" : "rgb(237, 231, 246)",
    },
  };
  // console.log("sep", messagetext);
  const handleDelete = (e) => {
    UseSnackbar(
      "Item Deleted Successfully. Deleted Items cannot be Restored .",
      "warning"
    );
    // console.log(e.currentTarget.id);
    // placing not deleted words in array
    const index = message.indexOf(e.currentTarget.id);
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
      if (index !== -1) {
        const deletedtitle = titles[index];
        const notdeletedtitle = titles.filter((word) => word !== deletedtitle);
        const deleteddate = date[index];
        const notdeleteddate = date.filter((word) => word !== deleteddate);
        setNewdate(notdeleteddate);
        setNewtitle(notdeletedtitle);
      }
      // if id is unique then no need of above logic
      const notdeletedvalues = [...notdeleted];
      setNewmessage(notdeletedvalues);
    }
  };
  const handleEdit = (e) => {
    //  using dom to apply styles is best as far now
    document.getElementById(e.currentTarget.id + "text").disabled = false;
    document.getElementById(e.currentTarget.id + "ok").disabled = false;
    setDis(false);
    const text = document.getElementById(e.currentTarget.id + "text");
    text.focus();
    text.select();
    // const okiconid = document.getElementById(e.currentTarget.id + "ok");
    // console.log("okiconid", okiconid);
    // okiconid.style.display = "unset";
    // console.log("okiconid", okiconid);
    // console.log(e.currentTarget.id);
  };
  const handleOk = (e) => {
    UseSnackbar("Message Saved Successfully", "success");
    const presentid = e.currentTarget.id;
    const presentValue = presentid.slice(0, presentid.length - 2);
    // console.log(presentValue);

    let valuesNow = message;
    let titlenow = titles;
    let datenow = date;
    // slicing added id
    const repeated = message.filter((word) => word === text);
    if (
      repeated.length > 0 &&
      message.indexOf(presentValue) !== message.indexOf(text)
    ) {
      setBackdrop(true);
    } else {
      // finding index where to change our to do  message text
      if (text === undefined) {
        setDis(true);
      } else {
        const index = message.indexOf(presentValue);

        if (index !== -1) {
          // valuesNow[index] = text;
          const shoulddeletemessage = message[index];
          const shoulddeletetitleandreadd = titles[index];
          const shoulddeletedate = date[index];
          const notdeletedmessages = message.filter(
            (word) => word !== shoulddeletemessage
          );
          const notdeletedtitles = titles.filter(
            (word) => word !== shoulddeletetitleandreadd
          );
          const notdeleteddates = date.filter(
            (word) => word !== shoulddeletedate
          );
          const currentdate = new Date().toISOString();
          datenow = [currentdate, ...notdeleteddates];
          valuesNow = [text, ...notdeletedmessages];
          titlenow = [shoulddeletetitleandreadd, ...notdeletedtitles];
        }
        // console.log(valuesNow);
        // updating query with the present values
        setNewdate(datenow);
        setNewtitle(titlenow);
        setNewmessage(valuesNow);
        setDis(true);
      }
    }
  };
  const handleCopy = (e) => {
    UseSnackbar("Item Copied Successfully", "success");
    contextValue.handleSnackMode(!contextValue.snackmode);
    // slicing added id

    const presentid = e.currentTarget.id;
    const presentValue = presentid.slice(0, presentid.length - 4);
    // console.log("copy", presentValue);
    const index = message.indexOf(presentValue);
    if (index !== -1) {
      const timing = moment
        .utc(date[index])
        .local()
        .format("MMMM Do YYYY, h:mm a");
      const title = titles[index];
      const clipboardvalue = `${title}         Last Modified:${timing} \n\n${presentValue}`;
      navigator.clipboard.writeText(clipboardvalue).then(
        function () {
          setCopy("Copied!");
          setTimeout(() => {
            setCopy("Copy to Clipboard");
          }, 5000);
        },
        function () {
          setCopy("Failed to Copy!");
          setTimeout(() => {
            setCopy("Copy to Clipboard");
          }, 5000);
        }
      );
    }
  };

  const expandMoreorLess = () => {
    if (expand === 3) {
      setExpand(undefined);
    } else {
      setExpand(3);
    }
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

  if (loading || manualLoading) {
    return (
      <>
        <SingleMessageLoader />
      </>
    );
  }
  return (
    <>
      <div
        disabled
        style={{
          padding: "20px",
          display: "flex",
          alignItems: expand === 3 ? "center" : "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: "100%",
            cursor: "text",
            padding: "0px 20px 0px 0px",
          }}
        >
          <Typography
            sx={{
              marginBottom: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              color: contextValue.mode ? "white" : "black",
            }}
          >
            {title}&emsp; {" -- "} &emsp;{"Last modified:"}
            <Typography sx={{ fontWeight: 500, fontSize: "12px" }}>
              &nbsp;
              {tolocaldate}
            </Typography>
          </Typography>
          <TextareaAutosize
            id={messagetext + "text"}
            disabled={dis}
            style={{
              background: contextValue.mode ? "black" : "white",
              color: contextValue.mode ? "white" : "rgb(94, 53, 177)",
              width: "100%",
              border: "none",
              // overflow: "auto",
              outline: "none",
              resize: "none",
              fontFamily: "revert",
              fontSize: "14px",
              cursor: "text",
            }}
            maxRows={expand}
            defaultValue={messagetext}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div style={{}}>
          <div
            style={{
              display: "flex",
            }}
          >
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
              disabled={dis || text === ""}
              sx={{
                "& .MuiTooltip-arrow": {
                  color: "rgb(237, 231, 246)",
                },
              }}
              arrow
              title="Click to Save"
              TransitionComponent={Zoom}
            >
              <IconButton
                id={messagetext + "ok"}
                sx={{
                  ...ButtonIconStyle,
                  //  display: "none",
                  margin: "0px",
                }}
                onClick={handleOk}
              >
                <SaveIcon />
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
          <div
            style={{
              display: "flex",
            }}
          >
            {" "}
            <TooltipColor
              id={messagetext + "tool"}
              sx={{
                "& .MuiTooltip-arrow": {
                  color: "rgb(237, 231, 246)",
                },
              }}
              arrow
              title={
                expand === 3 ? "Click to Expand More" : "Click to Expand Less"
              }
              TransitionComponent={Zoom}
            >
              <IconButton
                id={messagetext + "expand"}
                sx={ButtonIconStyle}
                onClick={expandMoreorLess}
              >
                {expand === 3 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </TooltipColor>
            <TooltipColor
              id={messagetext + "tool"}
              sx={{
                "& .MuiTooltip-arrow": {
                  color: "rgb(237, 231, 246)",
                },
              }}
              arrow
              title={copy}
              TransitionComponent={Zoom}
            >
              <IconButton
                id={messagetext + "copy"}
                sx={ButtonIconStyle}
                onClick={handleCopy}
              >
                {copy === "Copy to Clipboard" ? (
                  <ContentCopyIcon />
                ) : (
                  <CheckCircleOutlineIcon />
                )}
              </IconButton>
            </TooltipColor>
          </div>
        </div>
      </div>
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
            width: "500px",
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
              Repeated messages are not allowed to Add
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
export default TodoMessages;
