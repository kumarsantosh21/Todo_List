import React from "react";
import Skeleton from "@mui/material/Skeleton";
const SingleMessageLoader = () => {
  const animation = "pulse";
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "table",
            flex: "80%",
            width: "auto",
            height: "25px",
            // background: "lightgray",
            borderRadius: "8px",
            marginTop: "10px",
            overflow: "hidden",
            margin: "20px",
            textAlign: "left",
          }}
        >
          <div
            style={
              {
                // flex: "80%",
                // width: "auto",
                // height: "25px",
                // // background: "lightgray",
                // borderRadius: "8px",
                // marginTop: "10px",
                // overflow: "hidden",
                // margin: "20px",
                // textAlign: "left",
              }
            }
          >
            <Skeleton
              variant="text"
              sx={{
                background: "rgb(237, 231, 246)",
                borderRadius: "8px",
                width: "45%",
              }}
              height="25px"
              animation={animation}
            />
          </div>
          <div
            style={
              {
                // flex: "80%",
                // width: "auto",
                // height: "25px",
                // // background: "lightgray",
                // borderRadius: "8px",
                // marginTop: "10px",
                // overflow: "hidden",
                // margin: "20px",
                // textAlign: "left",
              }
            }
          >
            <Skeleton
              variant="text"
              sx={{ background: "rgb(237, 231, 246)", borderRadius: "8px" }}
              height="25px"
              animation={animation}
            />
          </div>
        </div>

        <div
          style={{
            flex: "2.5%",
            borderRadius: "6px",
            width: "5px",
            height: "35px",
            margin: "20px",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ background: "rgb(94, 53, 177)", borderRadius: "6px" }}
            height="35px"
            animation={animation}
          />
        </div>
        <div
          style={{
            flex: "2.5%",
            borderRadius: "6px",
            width: "5px",
            height: "35px",
            margin: "20px",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ background: "rgb(94, 53, 177)", borderRadius: "6px" }}
            height="35px"
            animation={animation}
          />
        </div>
        <div
          style={{
            flex: "2.5%",
            borderRadius: "6px",
            width: "5px",
            height: "35px",
            margin: "20px",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ background: "rgb(94, 53, 177)", borderRadius: "6px" }}
            height="35px"
            animation={animation}
          />
        </div>
        <div
          style={{
            flex: "2.5%",
            borderRadius: "6px",
            width: "5px",
            height: "35px",
            margin: "20px",
          }}
        >
          <Skeleton
            variant="text"
            sx={{ background: "rgb(94, 53, 177)", borderRadius: "6px" }}
            height="35px"
            animation={animation}
          />
        </div>
      </div>
    </>
  );
};

export default SingleMessageLoader;
