import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { Login3 } from "../assets";
import { reset } from "./";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function Reset() {
  const [disable, setDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [personicon, setPersonicon] = useState(false);
  const [errormessage, setErrormessage] = useState();
  const [screenSize, setScreensize] = useState(window.innerWidth);
  const [progress, setProgress] = useState(true);
  const [count, setCount] = useState(30);
  let valid;

  // for validation

  const errors = {
    formail:
      username !== "" &&
      !username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
  };
  const helpers = {
    formail: errors.formail ? "Please provide valid email" : "",
  };

  // assigning screen size
  const setDimension = () => {
    setScreensize(window.innerWidth);
  };

  const useStyles = makeStyles({
    stackstyles: {
      margin: screenSize >= 700 ? "5% 28%" : "none",
      padding: "0% 4% 2% 4%",
      boxShadow:
        screenSize >= 700 ? "4px 16px 44px rgb(3 23 111 / 20%)" : "none",
      borderRadius: "30px",
      overflow: "hidden",
      color: "gray",
      opacity: progress ? "0.3" : "none",
    },
    image: {
      width: "70%",
      paddingLeft: "16%",
    },
    forgetpassword: {
      lineHeight: "36px",
      marginLeft: "176px",
    },

    signup: {
      paddingLeft: "33px",
    },
    passvalid: {
      fontSize: "16px",
      color: errors.forpass ? "#d32f2f" : "#2e7d32",
      "&::before": {
        content: '"✔"',
        left: "-10px",
        position: "relative",
      },
    },
  });
  const classes = useStyles();
  // onclick of button
  const handleClick = async (e) => {
    e.preventDefault();
    setDisable(true);
    setPersonicon(false);

    // to get reset mail to user
    valid = await reset(username);
    if (valid === "success") {
      setErrormessage(2);
      const interval = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setDisable(false);
        setCount(30);
      }, 30000);
    }
    if (valid === "notfound") {
      setErrormessage(1);
      setDisable(false);
    }
    if (valid === "error") {
      setDisable(false);
    }
    window.scroll({
      top: 1000,
      left: 0,
      behavior: "smooth",
    });
  };
  // screen witdth checker
  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  // First loader
  useEffect(() => {
    setTimeout(() => {
      setProgress(false);
    }, 1000);
  }, [progress]);

  return (
    <>
      <form>
        <Stack className={classes.stackstyles} direction="column" spacing={3}>
          {progress || disable ? (
            <Box
              sx={{
                width: "150%",
                marginLeft: "-150px",
              }}
            >
              <LinearProgress />
            </Box>
          ) : null}
          <img className={classes.image} src={Login3} alt={"Todo"} />
          <Typography className={classes.signup}>
            Reset your password{" "}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon
              style={{
                color: personicon ? "blue" : "",
                alignSelf: "center",
                marginRight: "8px",
              }}
            />
            <TextField
              required
              disabled={progress}
              fullWidth
              error={errors.formail}
              helperText={helpers.formail}
              label="E-Mail"
              type="email"
              variant="outlined"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onFocus={() => {
                setPersonicon(true);
              }}
              onBlur={() => {
                setPersonicon(false);
              }}
            />
          </Box>

          <div style={{ textAlign: "right" }}>
            <LoadingButton
              disabled={
                disable || progress || username === "" || errors.formail
              }
              loading={disable || progress}
              loadingPosition="end"
              style={{
                color: "white",
                backgroundColor:
                  disable || progress || username === "" || errors.formail
                    ? " #ffb3ff"
                    : "#b300b3",
                width: "130px",
              }}
              variant="contained"
              onClick={handleClick}
              endIcon={<MailIcon />}
              type="submit"
            >
              Reset
            </LoadingButton>
          </div>
          {errormessage === 1 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ErrorOutlineIcon
                sx={{ color: "#d32f2f", mr: 1, marginBottom: "1px" }}
              />
              <div
                style={{
                  fontSize: "16px",
                  color: "#d32f2f",
                }}
              >
                User account not found.Please type your mail correctly and try
                again.
              </div>
            </div>
          ) : null}

          {errormessage === 2 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <VerifiedUserIcon
                sx={{ color: "#2e7d32", mr: 1, marginBottom: "1px" }}
              />
              <div
                style={{
                  fontSize: "16px",
                  color: "#2e7d32",
                }}
              >
                <div>
                  Please check your email inbox for a link to complete the reset
                  .If you haven't received mail.Try again in {count}.
                </div>
              </div>
            </div>
          ) : null}
        </Stack>
      </form>
    </>
  );
}
export default Reset;
