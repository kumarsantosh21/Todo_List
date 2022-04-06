import React from "react";
import Tooltips from "./Tooltip";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/Share";
const Footer = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          background: "white",
          boxShadow: "4px 16px 44px rgb(3 23 111 / 20%)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 60px ",
          }}
        >
          <div>
            <Typography>
              Developed with 💖 & Care by Bommepalli Santosh Kumar Reddy.
            </Typography>
          </div>
          <div>
            <Tooltips title="Contact Email" icon={<ContactMailIcon />} />
            <Tooltips title="Github" icon={<GitHubIcon />} />
            <Tooltips title="LinkedIn" icon={<LinkedInIcon />} />
            <Tooltips title="Share" icon={<ShareIcon />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
