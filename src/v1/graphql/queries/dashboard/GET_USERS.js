import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GET_USERS($usernam: String!) {
    user_name(query: { username: $usernam }) {
      _id
      username
      accesstoken
      docid
      accountstatus
      backupstatus
      lastbackupdate
      lastrestoredate
      restorestatus
    }
  }
`;
