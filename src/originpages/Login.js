import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

const Login = () => {
  const [disable, setDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [personicon, setPersonicon] = useState(false);
  const [lockicon, setLockicon] = useState(false);
  const [errormessage, setErrormessage] = useState(false);
  const [click, setClick] = useState(false);

  const useStyles = makeStyles({
    stackstyles: {
      margin: "51px 400px",
      padding: "0px 50px 40px 50px",
      boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
      borderRadius: "10px",
    },
    image: {
      borderRadius: "20%",
      background: "white",
      width: "70%",
      height: "auto",
      margin: "auto",
    },
    forgetpassword: { lineHeight: "36px", marginLeft: "176px" },

    signup: {
      textAlign: "right",
    },
  });
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (app.currentUser) {
        navigate("/v1/dashboard");
      } else {
        setDisable(false);
        if (!app.currentUser && click) {
          setTimeout(() => {
            setErrormessage(true);
          }, 500);
        }
      }
    }, 2000);
  }, [disable, navigate, click]);

  // console.log(app.currentUser);
  const handleClick = () => {
    getValidAccessToken(username, pass);
    setDisable(true);
    setClick(true);
  };

  return (
    <>
      <Stack className={classes.stackstyles} direction="column" spacing={3}>
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
            fullWidth
            label="E-Mail*"
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
            fullWidth
            label="Password*"
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
        <div style={{ display: "flex", marginLeft: "33px", marginTop: "30px" }}>
          <Button
            disabled={disable}
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
          </Button>
          <div className={classes.forgetpassword}>
            <a
              style={{ textDecoration: "none", color: "#0000ee" }}
              href="/restpassword"
            >
              Forgot password?
            </a>
          </div>
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
