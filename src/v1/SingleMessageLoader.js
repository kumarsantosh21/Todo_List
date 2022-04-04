import React from "react";
const SingleMessageLoader = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <div
          style={{
            flex: "80%",
            width: "auto",
            height: "15px",
            background: "lightgray",
            borderRadius: "8px",
            marginTop: "10px",
            overflow: "hidden",
            margin: "20px",
            textAlign: "left",
          }}
        ></div>
        <div
          style={{
            flex: "2%",
            borderRadius: "6px",
            width: "5px",
            height: "20px",
            margin: "20px",
            background: "rgb(94, 53, 177)",
          }}
        ></div>
        <div
          style={{
            flex: "2%",
            borderRadius: "6px",
            width: "5px",
            height: "20px",
            margin: "20px",
            background: "rgb(94, 53, 177)",
          }}
        ></div>
      </div>
    </>
  );
};

export default SingleMessageLoader;
