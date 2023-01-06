import React from "react";
import { styled } from "@mui/material/styles";
import { GoogleDocImg, DownArrowImg, ToDoImg, BackupIcon } from "../../assets";
import { GET_USERS } from "../graphql";
import { app } from "../../originpages/Client";
import hashCode from "./../Hashingstring";
import { useLazyQuery } from "@apollo/client";

const RestorePage = ({}) => {
  let interval;
  // eslint-disable-next-line no-undef
  const userid = BigInt(
    hashCode(app?.currentUser?._profile?.data?.email)
  ).toString();

  const [Fetc] = useLazyQuery(GET_USERS, {
    variables: {
      usernam: userid,
    },
    onCompleted: () => {},
    onError: (e) => {
      console.log(e);
    },
    pollInterval: 10000,
  });

  React.useEffect(() => {
    setTimeout(() => {
      Fetc();
    }, 10000);
  }, []);

  const Keyframes = styled("span")({
    "@keyframes spin": {
      " 0% ": { bottom: "0px" },
      "100%": { bottom: "100px" },
    },
    position: "relative",
    animation: "spin 1.4s ease-in-out 0s infinite reverse",
  });

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img
              style={{
                width: "80%",
                //  marginLeft: "43%"
              }}
              src={BackupIcon}
              alt="backupicon"
            />
          </div>
          <div>Restore Under Progress</div>
        </div>
        <div>
          <img
            style={{
              width: "15%",
              //  marginTop: "2%",
              //  marginLeft: "43%"
            }}
            src={GoogleDocImg}
            alt="googledoc"
          />
        </div>
        <div
          style={{
            height: "50%",
            overflow: "hidden",
            // marginLeft: "48%",
            width: "100%",
          }}
        >
          <Keyframes>
            <div>
              <img style={{ width: "5%" }} src={DownArrowImg} alt="loader" />
            </div>
          </Keyframes>
          <Keyframes>
            <div>
              <img
                style={{ width: "5%", marginTop: "2%" }}
                src={DownArrowImg}
                alt="downloarrow"
              />
            </div>
          </Keyframes>
          <Keyframes>
            <div>
              <img
                style={{ width: "5%", marginTop: "2%" }}
                src={DownArrowImg}
                alt="downarrow"
              />
            </div>
          </Keyframes>
        </div>

        <div>
          <img
            style={{
              width: "15%",
              // marginLeft: "43%"
            }}
            src={ToDoImg}
            alt="todoimage"
          />
        </div>
      </div>
    </>
  );
};
export default RestorePage;
