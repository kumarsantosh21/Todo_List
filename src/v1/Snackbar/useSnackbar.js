import { cache } from "../../originpages";
import { gql, useQuery } from "@apollo/client";

export const GET_SNACKBAR_MESSAGE = gql`
  query WriteSnackbar {
    snack {
      id
      message
      severity
    }
  }
`;

const useSnackbar = (message, severity) => {
  const newData = {
    // Contains the data to write
    snack: {
      id: 5,
      message: message,
      severity: severity,
    },
  };
  // console.log(newData);
  cache.writeQuery({
    query: GET_SNACKBAR_MESSAGE,
    data: newData,
  });

  return "";
};

export default useSnackbar;
