/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DaImg } from "./assets";

// Must be rendered inside of an ApolloProvider
function Movies() {
  let navigate = useNavigate();
  const ButtonStyle = {
    textTransform: "none",
    margin: "0px 15px",
    borderRadius: "6px",
    color: "rgb(94, 53, 177)",
    border: "1px solid rgb(94, 53, 177)",
    fontWeight: 500,
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          background: "white",
          boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
          height: "80px",
          borderRadius: "10px",
          width: "96%",
          marginLeft: "2%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "2%",
          }}
        >
          <img src={DaImg} alt="Todo" style={{}} />
          <Typography style={{ fontWeight: "600", fontSize: "20px" }}>
            TODO
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            sx={ButtonStyle}
            variant="standard"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
          <Button
            sx={ButtonStyle}
            variant="standard"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sing Up
          </Button>
        </div>
      </div>
    </>
  );
}

export default Movies;
