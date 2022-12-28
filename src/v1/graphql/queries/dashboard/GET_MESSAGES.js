import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GET_MESSAGES($usernam: String!) {
    data(query: { username: $usernam }) {
      _id
      username
      message
      title
      lastmodified
      backupstatus
    }
  }
`;
