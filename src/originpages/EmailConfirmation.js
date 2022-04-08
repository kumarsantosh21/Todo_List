import React from "react";
import { mailconfirmation } from "./";
import { useNavigate } from "react-router-dom";
export default function EmailConfirmation() {
  const [state, setState] = React.useState();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const tokenId = params.get("tokenId");
  const navigate = useNavigate();
  React.useEffect(() => {
    const confirmation = async () => {
      let valid;
      if (token || tokenId) {
        valid = await mailconfirmation(token, tokenId);
        // console.log(valid);
        if (valid === "success") {
          setState(1);
        }
        if (valid === "expired") {
          setState(2);
        }
      }
    };
    confirmation();
  }, []);

  return (
    <>
      {state === undefined ? (
        <>
          {token || tokenId ? (
            <div> Email Confirmation in Progress Please wait...</div>
          ) : (
            <div>
              You can only call Email Confirmation, if the user followed a
              confirmation Email link.
            </div>
          )}
        </>
      ) : null}
      {state === 1 ? (
        <>
          Mail Confirmation successfull.Click{" "}
          <a
            style={{
              textDecoration: "none",
              color: "#0000ee",
            }}
            href="/login"
          >
            here
          </a>{" "}
          to redirect to Login Page
        </>
      ) : null}
      {state === 2 ? (
        <>
          Mail Confirmation Failed.Link expired or invalid.Click{" "}
          <a
            style={{
              textDecoration: "none",
              color: "#0000ee",
            }}
            href="/signup"
          >
            here
          </a>{" "}
          to redirect to resend Confirmation mail Page.
        </>
      ) : null}
    </>
  );
}
