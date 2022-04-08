import React from "react";
import TodoMessages from "./TodoMessages";

const TodoMessagesMapper = ({ messa, title }) => {
  const messagedata = messa;
  // console.log("map", messa);

  const Todoblock = messagedata.map((data, index) => {
    const titles = title?.[index];

    return (
      <>
        {/* {messagedata[0] === data ? null : <hr />} */}
        <hr />
        <TodoMessages key={data} messagetext={data} title={titles} />
      </>
    );
  });
  return <>{Todoblock}</>;
};

export default TodoMessagesMapper;
