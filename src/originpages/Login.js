import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import { Login3 } from "../assets";
import { useNavigate } from "react-router-dom";
import { app, getValidAccessToken, gclick } from "./";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";
import { GoogleImg } from "../assets";
import Button from "@mui/material/Button";
import checkundefinednull from "../v1/validators/checkundefinednull";
import Typography from "@mui/material/Typography";

const Login = () => {
  const [disable, setDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [personicon, setPersonicon] = useState(false);
  const [lockicon, setLockicon] = useState(false);
  const [errormessage, setErrormessage] = useState(false);
  const [screenSize, setScreensize] = useState(window.innerWidth);
  const [progress, setProgress] = useState(true);
  let valid;
  // assigning screen size
  const setDimension = () => {
    setScreensize(window.innerWidth);
  };
  const useStyles = makeStyles({
    stackstyles: {
      margin: screenSize >= 700 ? "5% 28%" : "none",
      padding: "0% 4% 3% 4%",
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
      cursor: "pointer",
    },
    forgetpassword: {
      lineHeight: "36px",
      marginLeft: screenSize >= 1100 ? "176px" : "",
      marginTop: screenSize >= 1100 ? "0px" : "25px",
      marginBottom: screenSize >= 1100 ? "0px" : "-20px",
      textAlign: screenSize >= 1100 ? "" : "right",
    },

    signup: {
      textAlign: "right",
    },
  });
  const classes = useStyles();

  const navigate = useNavigate();
  //  if user already logged in redirect to dashboard directly
  useEffect(() => {
    if (app.currentUser) {
      navigate("/v1/dashboard");
    }
  }, [navigate]);

  // for reading mail and password from url link
  const params = new URLSearchParams(window.location.search);
  const urlmail = params.get("mail");
  const urlpassword = params.get("pwd");
  // console.log(urlmail, urlpassword);

  useEffect(() => {
    if (!checkundefinednull(urlmail)) {
      setUsername(urlmail);
    }
    if (!checkundefinednull(urlpassword)) {
      setPass(urlpassword);
    }
  }, [urlmail, urlpassword]);

  // onclick of button
  const handleClick = async (e) => {
    e.preventDefault();
    setDisable(true);
    setLockicon(false);
    setPersonicon(false);
    valid = await getValidAccessToken(username, pass);

    if (app.currentUser) {
      setTimeout(() => {
        navigate("/v1/dashboard");
      }, 1000);
    }
    if (valid === "error") {
      // new Audio(testinglol).play();
      setErrormessage(true);
      setDisable(false);
      window.scroll({
        top: 1000,
        left: 0,
        behavior: "smooth",
      });
    }
  };
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

  const errors = {
    formail: !username?.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
  };
  const helpers = {
    formail: errors?.formail ? "Please provide valid email" : "",
  };
  // console.log(username, pass);
  const multiplyValue =
    disable ||
    progress ||
    checkundefinednull(username) ||
    checkundefinednull(pass) ||
    errors.formail
      ? 80
      : 0;
  const button = document.getElementById("loading_button");
  button?.addEventListener("mouseover", function () {
    button.style.left = `${Math.ceil((Math.random() + 0.1) * multiplyValue)}%`;
    button.style.top = `${Math.ceil((Math.random() + 0.1) * multiplyValue)}%`;
  });

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
          <img
            className={classes.image}
            src={Login3}
            alt={"Todo"}
            onClick={() => {
              navigate("/login");
            }}
          />
          <div className={classes.signup}>
            Don't have an account?{" "}
            <a style={{ color: "#0000ee" }} href="/signup">
              Sign Up
            </a>
          </div>

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
              error={!checkundefinednull(username) ? errors.formail : null}
              helperText={
                !checkundefinednull(username) ? helpers.formail : null
              }
              fullWidth
              label="E-Mail"
              type="email"
              variant="outlined"
              defaultValue={urlmail}
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
                if (!checkundefinednull(e.target.value)) {
                  window.history.pushState(
                    {},
                    "",
                    `login?mail=${e.target.value}`
                  );
                } else {
                  window.history.pushState({}, "", "login");
                }
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
                color: lockicon ? "blue" : "",
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
              autoComplete="on"
              variant="outlined"
              defaultValue={urlpassword}
              name="pass"
              onChange={(e) => {
                setPass(e.target.value);
              }}
              onFocus={() => {
                setLockicon(true);
              }}
              onBlur={() => {
                setLockicon(false);
              }}
            />
          </Box>
          <div
            style={{
              display: screenSize >= 1100 ? "flex" : "",
              marginLeft: "33px",
              marginTop: "30px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LoadingButton
              id="loading_button"
              disabled={
                disable ||
                progress ||
                checkundefinednull(username) ||
                checkundefinednull(pass) ||
                errors.formail
              }
              loading={disable || progress}
              loadingPosition="end"
              style={{
                color: "white",
                backgroundColor:
                  disable ||
                  progress ||
                  checkundefinednull(username) ||
                  checkundefinednull(pass) ||
                  errors.formail
                    ? " #ffb3ff"
                    : "#b300b3",
                width: screenSize >= 1100 ? "110px" : "100%",
              }}
              variant="contained"
              onClick={handleClick}
              endIcon={<LoginIcon />}
              type="submit"
            >
              Login
            </LoadingButton>

            <div className={classes.forgetpassword}>
              <a
                style={{
                  textDecoration: "none",
                  color: "#0000ee",
                }}
                href="/resetpassword"
              >
                Forgot password?
              </a>
            </div>
          </div>
          {errormessage ? (
            <div style={{ display: "flex", textAlign: "center" }}>
              <ErrorOutlineIcon sx={{ color: "#d32f2f", mr: 0, my: -0.4 }} />
              <div
                style={{
                  fontSize: "16px",
                  color: "#d32f2f",
                }}
              >
                Wrong E-mail or password. Try again or click ‘Forgot password’
                to reset it. Or You might forgot to confirm your mail, check
                inbox. If link expired in the mail box click{" "}
                <a
                  style={{
                    color: "#0000ee",
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                  href="/signup"
                >
                  here
                </a>{" "}
                to redirect to send Confirmation Email.
              </div>
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "96%",
              margin: "25px 0px 0px 23px",
            }}
          >
            <div
              style={{
                content: "",
                flex: "0 1 100%",
                borderBottom: "1px solid #585858",
                margin: "0px 10px",
                transform: "translateY(-50%)",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                lineHeight: "16px",
                fontWeight: "normal",
                color: "rgb(93, 108, 116)",
                textAlign: "center",
              }}
            >
              or
            </span>
            <div
              style={{
                content: "",
                flex: "0 1 100%",
                borderBottom: "1px solid #585858",
                margin: "0px 10px",
                transform: "translateY(-50%)",
              }}
            />
          </div>
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid rgb(66, 133, 244)",
              borderRadius: "4px",
              marginLeft: "23px",
              marginTop: "0px",
            }}
          >
            <div
              onClick={gclick}
              style={{ flex: "10%", textAlign: "center", cursor: "pointer" }}
            >
              <img
                src={GoogleImg}
                alt="G_image"
                style={{
                  width: "30px",
                  height: "30px",
                  verticalAlign: "-webkit-baseline-middle",
                }}
              />
            </div>
            <Button
              onClick={gclick}
              style={{
                flex: "90%",
                color: "white",
                background: "rgb(66, 133, 244)",
                textTransform: "none",
                borderRadius: "unset",
              }}
            >
              Login in with Google
            </Button>
          </div> */}

          <Typography sx={{ padding: "0px 0px 10px 33px" }}>
            By signing up or login and continuing, you agree to our
            <a
              target="_blank"
              style={{
                color: "#0000ee",
                textDecoration: "none",
                fontSize: "16px",
              }}
              href="/termsandprivacy"
            >
              {" "}
              Terms of Service and Privacy Policy.
            </a>
          </Typography>
          <Button
            onClick={gclick}
            style={{
              color: "rgb(92, 108, 117)",
              background: "white",
              textTransform: "none",
              borderRadius: "6px",
              border: "1px solid rgb(92, 108, 117)",
              margin: "0px 0px 0px 33px",
            }}
            sx={{
              "&:hover": {
                boxShadow: "rgb(232 236 235) 0px 0px 0px 3px",
              },
            }}
          >
            <img
              src={GoogleImg}
              alt="G_image"
              style={{
                width: "30px",
                height: "30px",
                verticalAlign: "-webkit-baseline-middle",
              }}
            />
            &emsp;
            <Typography sx={{ fontWeight: 600 }}>Login with Google</Typography>
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Login;
