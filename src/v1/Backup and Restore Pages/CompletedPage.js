import React from "react";
import { BackupIcon, CompletedGif } from "../../assets";
import { UPDATE_USER_NAME_BACKUP } from "../graphql";
import { app } from "../../originpages/Client";
import hashCode from "./../Hashingstring";
import { useMutation } from "@apollo/client";

const CompletedPage = ({ completedText, state, getUsers }) => {
  // eslint-disable-next-line no-undef
  const userid = BigInt(
    hashCode(app?.currentUser?._profile?.data?.email)
  ).toString();

  const [UPDATE_CLOUD, {}] = useMutation(UPDATE_USER_NAME_BACKUP, {
    onCompleted: () => {
      getUsers();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const handleClick = () => {
    const status = state === "B" ? "backupstatus" : "restorestatus";
    if (userid) {
      UPDATE_CLOUD({
        variables: {
          username: userid,
          updates: {
            [status]: "",
          },
        },
      });
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div>
          <img
            style={{ width: "10%", marginTop: "2%" }}
            src={CompletedGif}
            alt="completed"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2%",
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              &nbsp;{completedText}
            </div>
            <div
              style={{ fontSize: "24px", fontWeight: "bold", color: "#0abf28" }}
            >
              &nbsp;Completed
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2%",
          }}
        >
          Click&nbsp;
          <div
            onClick={handleClick}
            style={{
              textDecoration: "underline",
              color: "blue",
              cursor: "pointer",
            }}
          >
            here&nbsp;
          </div>
          to redirect to &nbsp;<b>TODO Dashboard</b>
        </div>
      </div>
    </>
  );
};
export default CompletedPage;
