import React from "react";
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "4%",
            fontWeight: "bold",
            color: "red",
          }}
        >
          {state === "B"
            ? `${completedText} Failed because created file not found while
          backing up in the current google account`
            : `${completedText} Failed because backedup file not found while
          trying to restore the data from  the current google account`}
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
          to redirect to &nbsp;<b>TODO Dashboard</b> &nbsp;and try doing{" "}
          {completedText} &nbsp;again with different account to {completedText}{" "}
          &nbsp;your data
        </div>
      </div>
    </>
  );
};
export default CompletedPage;
