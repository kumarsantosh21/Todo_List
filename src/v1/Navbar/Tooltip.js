import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import styled from "@mui/material/styles/styled";
import IconButton from "@mui/material/IconButton";

const Tooltips = ({ title, icon, onClick }) => {
  const iconStyles = {
    borderRadius: "6px",
    "&:hover": {
      color: "rgb(94, 53, 177)",
      background: "rgb(237, 231, 246)",
    },
  };
  const TooltipColor = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      componentsProps={{ tooltip: { className: className } }}
    />
  ))(`
      color:rgb(94, 53, 177) ;
      background: rgb(237, 231, 246);
      font-size:12px;
      font-weight:bold;
     
  `);
  return (
    <>
      <TooltipColor
        sx={{
          "& .MuiTooltip-arrow": {
            color: "rgb(237, 231, 246)",
          },
        }}
        arrow
        title={title}
        TransitionComponent={Zoom}
      >
        <IconButton sx={iconStyles} onClick={onClick}>
          {icon}
        </IconButton>
      </TooltipColor>
    </>
  );
};

export default Tooltips;
