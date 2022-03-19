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
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

const Login = () => {
  const [disable, setDisable] = useState(true);
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
      margin: screenSize >= 1200 ? "51px 400px" : "20px 100px",
      padding: screenSize >= 1200 ? "0px 50px 40px 50px" : "none",
      boxShadow:
        screenSize >= 1200 ? "4px 16px 44px rgb(3 23 111 / 20%)" : "none",
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
      setDisable(false);
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
            style={{ color: personicon ? "blue" : "none" }}
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
            style={{ color: lockicon ? "blue" : "none" }}
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
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={1}>
              <LoadingButton
                disabled={disable || progress}
                loading={disable || progress}
                loadingPosition="end"
                style={{
                  color: "white",
                  backgroundColor: disable ? " #ffb3ff" : "#b300b3",
                  width: "110px",
                }}
                variant="contained"
                onClick={handleClick}
                endIcon={<LoginIcon />}
              >
                Login
              </LoadingButton>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={9}>
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
            </Grid>
          </Grid>
        </div>
        {errormessage ? (
          <div style={{ display: "flex" }}>
            <ErrorOutlineIcon sx={{ color: "red", mr: 0, my: -0.4 }} />
            <div
              style={{ fontSize: "16px", color: "red", textAlign: "center" }}
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
