import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { Login3 } from "../assets";
import { completepasswordreset } from "./";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function ResetConfirmation() {
  const [disable, setDisable] = useState(false);
  const [pass, setPass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [lockicon1, setLockicon1] = useState(false);
  const [lockicon2, setLockicon2] = useState(false);
  const [errormessage, setErrormessage] = useState();
  const [screenSize, setScreensize] = useState(window.innerWidth);
  const [progress, setProgress] = useState(true);
  const [mailandpassword, setMailandpassword] = useState(false);
  const [errorhandler, setErrorhandler] = useState(false);
  let valid;
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const tokenId = params.get("tokenId");

  // for validation

  const errors = {
    forpass: pass !== "" && pass.length < 6,
  };

  // for checking whether the link is followed from mail or not
  useEffect(() => {
    if (token || tokenId) {
      setMailandpassword(true);
    }
  }, [token, tokenId]);
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
    passvalid: {
      fontSize: "16px",
      color: errors.forpass ? "#d32f2f" : "#2e7d32",
      "&::before": {
        content: errors.forpass ? '"✖"' : '"✔"',
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
    setLockicon1(false);
    setLockicon2(false);
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
      // console.log(pass, token, tokenId);
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
      // console.log(valid);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
    }
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

          {mailandpassword ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon
                style={{
                  color: lockicon1 ? "blue" : "",
                  alignSelf: "center",
                  marginRight: "8px",
                }}
              />

              <TextField
                required
                disabled={progress}
                fullWidth
                error={errors.forpass}
                label="New Password"
                type="password"
                variant="outlined"
                autoComplete="on"
                name="pass"
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                onFocus={() => {
                  setLockicon1(true);
                  setErrorhandler(true);
                }}
                onBlur={() => {
                  setLockicon1(false);
                  setErrorhandler(false);
                }}
              />
            </Box>
          ) : null}

          {errorhandler && pass !== "" ? (
            <div style={{ marginLeft: "20%" }}>
              <div
                style={{
                  marginLeft: "-20px",
                  marginBottom: "10px",
                  color: "black",
                }}
              >
                <Typography>Password must contain the following</Typography>
              </div>
              <div className={classes.passvalid}>
                Password length must be greater than 5 Characters
              </div>
            </div>
          ) : null}

          {mailandpassword ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LockIcon
                style={{
                  color: lockicon2 ? "blue" : "",
                  alignSelf: "center",
                  marginRight: "8px",
                }}
              />

              <TextField
                required
                disabled={progress}
                fullWidth
                label="Re-Password"
                type="password"
                variant="outlined"
                autoComplete="on"
                name="newpass"
                onChange={(e) => {
                  setNewpass(e.target.value);
                }}
                onFocus={() => {
                  setLockicon2(true);
                }}
                onBlur={() => {
                  setLockicon2(false);
                }}
              />
            </Box>
          ) : null}

          <div style={{ textAlign: "right" }}>
            <LoadingButton
              disabled={
                disable ||
                progress ||
                pass === "" ||
                newpass === "" ||
                errors.forpass
              }
              loading={disable || progress}
              loadingPosition="end"
              style={{
                color: "white",
                backgroundColor:
                  disable ||
                  progress ||
                  pass === "" ||
                  newpass === "" ||
                  errors.forpass
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
              </div>
            </div>
          ) : null}
        </Stack>
      </form>
    </>
  );
}
export default ResetConfirmation;
