/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Must be rendered inside of an ApolloProvider
function Movies() {
  let navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </div>
    </>
  );
}

export default Movies;
