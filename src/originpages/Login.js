import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import LoginIcon from "@mui/icons-material/Login";
import { Login3 } from "../assets";
import { useNavigate } from "react-router-dom";
import { app, getValidAccessToken } from "./Client";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinearProgress from "@mui/material/LinearProgress";

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
      textAlign: "right",
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    if (app.currentUser) {
      navigate("/v1/dashboard");
    }
  }, []);

  // console.log(app.currentUser);
  const handleClick = async () => {
    setDisable(true);
    setLockicon(false);
    setPersonicon(false);
    valid = await getValidAccessToken(username, pass);
    console.log("inside", valid);

    if (app.currentUser && valid !== "error") {
      setTimeout(() => {
        navigate("/v1/dashboard");
      }, 1000);
    }
    if (valid === "error") {
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
        <div className={classes.signup}>
          Don't have an account?{" "}
          <a style={{ color: "#0000ee" }} href="/signup">
            Sign Up
          </a>
        </div>

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
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <LockIcon
            style={{ color: lockicon ? "blue" : "" }}
            sx={{ mr: 1, my: 2 }}
          />

          <TextField
            required
            disabled={progress}
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            name="pass"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            onClick={() => {
              setLockicon(true);
            }}
          />
        </Box>
        <div
          style={{
            display: "flex",
            marginLeft: "33px",
            marginTop: "30px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LoadingButton
            disabled={disable || progress}
            loading={disable || progress}
            loadingPosition="end"
            style={{
              color: "white",
              backgroundColor: disable || progress ? " #ffb3ff" : "#b300b3",
              width: "110px",
            }}
            variant="contained"
            onClick={handleClick}
            endIcon={<LoginIcon />}
          >
            Login
          </LoadingButton>

          <div className={classes.forgetpassword}>
            <a
              style={{
                textDecoration: "none",
                color: "#0000ee",
                textAlign: "right",
              }}
              href="/restpassword"
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
              Wrong E-mail or password. Try again or click ‘Forgot password’ to
              reset it.
            </div>
          </div>
        ) : null}
      </Stack>
    </>
  );
};

export default Login;
