import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import { Login3 } from "../assets";
import { register } from "./";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Typography from "@mui/material/Typography";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const Register = () => {
  const [disable, setDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");
  const [personicon, setPersonicon] = useState(false);
  const [lockicon1, setLockicon1] = useState(false);
  const [lockicon2, setLockicon2] = useState(false);
  const [errormessage, setErrormessage] = useState();
  const [screenSize, setScreensize] = useState(window.innerWidth);
  const [progress, setProgress] = useState(true);
  const [errorhandler, setErrorhandler] = useState(false);

  let valid;

  // for validation

  const errors = {
    formail:
      username !== "" &&
      !username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    forpass: pass !== "" && pass.length < 6,
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
      margin: screenSize >= 700 ? "3% 28%" : "none",
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
  //  onclick button function
  const handleClick = async (e) => {
    e.preventDefault();
    setDisable(true);
    setLockicon1(false);
    setLockicon2(false);
    setPersonicon(false);
    if (pass !== repass) {
      setErrormessage(2);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    // here users gets registerd
    valid = await register(username, pass);

    if (valid === "success") {
      setErrormessage(3);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
    }
    if (valid === "exists") {
      setErrormessage(1);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
    }
    if (valid === "error") {
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
    }
    window.scroll({
      top: 1000,
      left: 0,
      behavior: "smooth",
    });
  };
  // calling function every time screen width changes
  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  // first loader
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
            Register your account here{" "}
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
              label="E-Mail"
              type="email"
              error={errors.formail}
              helperText={helpers.formail}
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
              label="Password"
              type="password"
              error={errors.forpass}
              variant="outlined"
              autoComplete="off"
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
              label="Re-enter Password"
              type="password"
              variant="outlined"
              autoComplete="off"
              name="repass"
              onChange={(e) => {
                setRepass(e.target.value);
              }}
              onFocus={() => {
                setLockicon2(true);
              }}
              onBlur={() => {
                setLockicon2(false);
              }}
            />
          </Box>
          <div style={{ textAlign: "right" }}>
            <LoadingButton
              disabled={
                disable ||
                progress ||
                pass === "" ||
                repass === "" ||
                errors.forpass ||
                username === "" ||
                errors.formail
              }
              loading={disable || progress}
              loadingPosition="end"
              style={{
                color: "white",
                backgroundColor:
                  disable ||
                  progress ||
                  pass === "" ||
                  repass === "" ||
                  errors.forpass ||
                  username === "" ||
                  errors.formail
                    ? " #ffb3ff"
                    : "#b300b3",
                width: "130px",
              }}
              variant="contained"
              type="submit"
              onClick={handleClick}
              endIcon={<HowToRegIcon />}
            >
              Register
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
                User account already exist.Please Try Logging in or click{" "}
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
                to Reset Password
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
                Registration Succesful.Click{" "}
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
          ) : null}
        </Stack>
      </form>
    </>
  );
};

export default Register;
