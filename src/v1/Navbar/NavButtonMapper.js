import React from "react";
import NavButton from "./NavButton";
const NavButtonMapper = () => {
  const Buttondata = [
    { uniqueId: 0, name: "Dashboard" },
    { uniqueId: 1, name: "Experiment Zone" },
  ];

  const Buttons = Buttondata.map((data) => {
    return (
      <>
        <NavButton key={data.uniqueId} Buttonname={data.name} />
      </>
    );
  });
  return <>{Buttons}</>;
};

export default NavButtonMapper;
