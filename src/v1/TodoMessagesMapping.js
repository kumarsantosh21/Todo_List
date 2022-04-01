import React from "react";
import TodoMessages from "./TodoMessages";

const TodoMessagesMapper = ({ messa }) => {
  const messagedata = messa;
  // console.log("map", messa);

  const Todoblock = messagedata.map((data) => {
    return (
      <>
        {messagedata[0] === data ? null : <hr />}
        <TodoMessages key={data} messagetext={data} />
      </>
    );
  });
  return <>{Todoblock}</>;
};

export default TodoMessagesMapper;
