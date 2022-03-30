import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { app } from "../originpages/Client";
import { useNavigate } from "react-router-dom";
import { Loading } from "../assets/Loaders";
import Navbar from "./Navbar/Navbar";
import { GET_USERS, UPDATE_USERS } from "./graphql";

function Dahboard() {
  const navigate = useNavigate();
  const [skeleton, setSkeleton] = React.useState();
  const [newData, setNewData] = React.useState();
  const [Fetc, { loading, error, data }] = useLazyQuery(GET_USERS, {
    onCompleted: (data) => {
      // console.log("oncomplete", data);
      const incomingdata = JSON.parse(JSON.stringify(data));
      // incomingdata.user_name.user[0] = "santesting";
      // console.log("incoming", incomingdata);
      setSkeleton(incomingdata);
    },
  });
  const [ADDTO] = useMutation(UPDATE_USERS, {
    variables: {
      cloud: "mongo",
      updates: {
        user: newData,
      },
    },
  });
  React.useEffect(() => {
    Fetc();
    if (skeleton !== undefined) {
      const name = skeleton.user_name.user;
      if (!name.includes(app.currentUser._profile.data.email)) {
        const db = [...name, app.currentUser._profile.data.email];
        setNewData(db);
      }
    }
  }, [skeleton, Fetc]);
  React.useEffect(() => {
    if (newData !== undefined) {
      ADDTO();
    }
  }, [newData, ADDTO]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    console.log(error);
    return <div>encountered an error</div>;
  }
  // console.log(data);
  // console.log("skeleton", skeleton);
  // console.log("outsidenew", newData);
  return (
    <>
      <Navbar />
    </>
  );
}
export default Dahboard;

// console.log("Welcome to Programiz!");
// let a={}
// let b={}
// let c=[{san:{message:["hello","jollo"]}},{"sant":{message:["hello","jollo"]}},{a:"s"},a,b]
// const ab="ab.oj"
// console.log(ab.split(".").join(""))
// console.log(c.find(a => a.sant.message[1]))
// const x=c.find(a => a.sant)
// console.log(x.sant.message[1])
