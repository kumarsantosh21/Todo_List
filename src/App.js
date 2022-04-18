/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DaImg } from "./assets";

// Must be rendered inside of an ApolloProvider
function App() {
  const [screenSize, setScreensize] = React.useState(window.innerWidth);
  const setDimension = () => {
    setScreensize(window.innerWidth);
  };
  React.useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
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
        onMouseMove={(e) => {
          setX((window.innerHeight / 2 - e.clientY) / 30);
          setY(-(window.innerWidth / 2 - e.clientX) / 30);
        }}
      >
        <div
          style={{
            position: "fixed",
            background: "white",
            boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
            height: screenSize < 1050 ? "fit-content" : "80px",
            borderRadius: "10px",
            width: screenSize < 1050 ? "fit-content" : "96%",
            marginLeft: "2%",

            display: screenSize < 1050 ? "grid" : "flex",
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
              display: screenSize < 1050 ? "grid" : "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              margin: screenSize < 1050 ? "40px" : "",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=santoorvlss4321@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{ ...ButtonStyle, border: "none" }}
                  variant="standard"
                >
                  Help
                </Button>
              </a>
            </div>
            <Button
              sx={{
                ...ButtonStyle,
                border:
                  screenSize < 1050 ? "none" : "1px solid rgb(94, 53, 177)",
              }}
              variant="standard"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              sx={{
                ...ButtonStyle,
                border:
                  screenSize < 1050 ? "none" : "1px solid rgb(94, 53, 177)",
              }}
              variant="standard"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sing Up
            </Button>
          </div>
        </div>
        {screenSize >= 1050 ? (
          <div>
            <div
              style={{
                position: "relative",

                marginLeft: "15%",
                perspective: "1000px",
              }}
            >
              <div
                style={{
                  padding: "50px",
                  position: "absolute",
                  background: `url(${DaImg})`,
                  backgroundRepeat: "no-repeat",
                  transformStyle: "preserve-3d",
                  transform: "rotateX(" + x + "deg) rotateY(" + y + "deg)",
                  backgroundPositionX: "center",
                  backgroundPositionY: "center",
                  backgroundSize: "contain",
                  width: "70%",
                  height: "75vh",
                  marginTop: "8%",
                  transition: "transform 0.05s linear",
                }}
              >
                {/* <div
                style={{
                  background: "inherit",
                  content: "",
                  display: "block",
                  position: "absolute",
                  left: "144px",
                  top: "247px",
                  width: "80%",
                  height: "60%",
                  zIndex: "-1",
                  filter: "blur(55px)",
                }}
              ></div> */}
                <h2
                  style={{
                    transform: "translateZ(80px)",
                    position: "absolute",
                    fontWeight: "bold",
                    fontSize: "80px",
                    marginLeft: "90px",
                  }}
                >
                  Todo List
                </h2>
                <div
                  style={{
                    transform: "translateZ(50px)",
                    position: "absolute",
                    fontWeight: "bold",
                    fontSize: "30px",
                    marginTop: "220px",
                    marginLeft: "450px",
                  }}
                >
                  Stores data like notepad but in Cloud and Many features.
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
