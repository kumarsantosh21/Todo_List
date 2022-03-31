import React from "react";
import TodoMessages from "./TodoMessages";

const TodoMessagesMapper = ({ messa }) => {
  let count = 0;
  if (count === 0) {
    count = 1;
    messa.shift();
  }
  console.log("map", messa);
  //   messa.shift();
  const messagedata = messa;
  console.log("map", messa);

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
