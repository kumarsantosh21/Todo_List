import React from "react";
import Tooltips from "./Tooltip";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ShareIcon from "@mui/icons-material/Share";
const Footer = () => {
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
  return (
    <>
      <div
        style={{
          position: screenSize >= 1050 ? "fixed" : "",
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
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=santoorvlss4321@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tooltips title="Contact Email" icon={<ContactMailIcon />} />
            </a>
            <a
              href="https://github.com/kumarsantosh21"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tooltips title="Github" icon={<GitHubIcon />} />
            </a>
            <a
              href="https://www.linkedin.com/in/bommepalli-santosh-kumar-reddy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tooltips title="LinkedIn" icon={<LinkedInIcon />} />
            </a>

            <Tooltips
              title="Share"
              icon={<ShareIcon />}
              onClick={async () => {
                const shareData = {
                  title: "Notepad List",
                  text: "Store everything like notepad but Online and More features!",
                  url: "https://todolist-ljlbv.mongodbstitch.com/",
                  //   files: [],
                };

                try {
                  await navigator.share(shareData);
                } catch (err) {
                  console.log(err);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
