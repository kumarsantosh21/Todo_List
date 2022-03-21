import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { Login3 } from "../assets";
import { reset, completepasswordreset } from "./";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function Reset() {
  const [disable, setDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [personicon, setPersonicon] = useState(false);
  const [lockicon1, setLockicon1] = useState(false);
  const [lockicon2, setLockicon2] = useState(false);
  const [errormessage, setErrormessage] = useState();
  const [screenSize, setScreensize] = useState(window.innerWidth);
  const [progress, setProgress] = useState(true);
  const [count, setCount] = useState(30);
  const [mailandpassword, setMailandpassword] = useState(false);
  let valid;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const tokenId = params.get("tokenId");
  // for checking whether the link is followed from mail or not
  useEffect(() => {
    if (token || tokenId) {
      setMailandpassword(true);
    }
  }, []);
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
      borderRadius: "10px",
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
  });
  const classes = useStyles();
  // onclick of button
  const handleClick = async () => {
    setDisable(true);
    setLockicon1(false);
    setLockicon2(false);
    setPersonicon(false);
    if (pass !== newpass) {
      setErrormessage(2);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    // followed from mail this click works
    if (token || tokenId) {
      console.log(pass, token, tokenId);
      valid = await completepasswordreset(pass, token, tokenId);
      if (valid === "success") {
        setErrormessage(3);
      }
      if (valid === "expired") {
        setErrormessage(1);
      }
      if (valid === "error") {
        setDisable(false);
      }
      console.log(valid);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    // to get reset mail to user
    valid = await reset(username, pass);
    console.log("in", valid);
    if (valid === "success") {
      setErrormessage(3);
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
        <Typography className={classes.signup}>Reset your password </Typography>
        {!mailandpassword ? (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <PersonIcon
              style={{ color: personicon ? "blue" : "" }}
              sx={{ mr: 1, my: 2 }}
            />
            <TextField
              required
              disabled={progress}
              fullWidth
              label="E-Mail"
              type="email"
              variant="outlined"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              onClick={() => {
                setPersonicon(true);
              }}
            />
          </Box>
        ) : null}
        {mailandpassword ? (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon
              style={{ color: lockicon1 ? "blue" : "" }}
              sx={{ mr: 1, my: 2 }}
            />

            <TextField
              required
              disabled={progress}
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              name="pass"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              onClick={() => {
                setLockicon1(true);
              }}
            />
          </Box>
        ) : null}
        {mailandpassword ? (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon
              style={{ color: lockicon2 ? "blue" : "" }}
              sx={{ mr: 1, my: 2 }}
            />

            <TextField
              required
              disabled={progress}
              fullWidth
              label="Re-Password"
              type="password"
              variant="outlined"
              name="newpass"
              onChange={(e) => {
                setNewpass(e.target.value);
              }}
              onClick={() => {
                setLockicon2(true);
              }}
            />
          </Box>
        ) : null}
        <div style={{ textAlign: "right" }}>
          <LoadingButton
            disabled={disable || progress}
            loading={disable || progress}
            loadingPosition="end"
            style={{
              color: "white",
              backgroundColor: disable || progress ? " #ffb3ff" : "#b300b3",
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
            {!mailandpassword ? (
              <div
                style={{
                  fontSize: "16px",
                  color: "#d32f2f",
                }}
              >
                User account not found.Check your mail once and retry again.
              </div>
            ) : (
              <div
                style={{
                  fontSize: "16px",
                  color: "#d32f2f",
                }}
              >
                Your link Expired.Click{" "}
                <a
                  style={{
                    color: "#0000ee",
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                  href="/resetpassword"
                >
                  here
                </a>{" "}
                to redirect to send another mail.
              </div>
            )}
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
            <LockIcon sx={{ color: "#d32f2f", mr: 1, marginBottom: "1px" }} />
            <div
              style={{
                fontSize: "16px",
                color: "#d32f2f",
              }}
            >
              Both the passwords should match.
            </div>
          </div>
        ) : null}
        {errormessage === 3 ? (
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
              {!mailandpassword ? (
                <>
                  <div>
                    Please check your email inbox for a link to complete the
                    reset .If you haven't received mail.Try again in {count}.
                  </div>
                </>
              ) : (
                <div
                  style={{
                    fontSize: "16px",
                    color: "#2e7d32",
                  }}
                >
                  Password Succesfully Changed.Click{" "}
                  <a
                    style={{
                      color: "#0000ee",
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                    href="/login"
                  >
                    here
                  </a>{" "}
                  to redirect to Login page.
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Stack>
    </>
  );
}
export default Reset;
