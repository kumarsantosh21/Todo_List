import { gql } from "@apollo/client";

export const UPDATE_USER_NAME_BACKUP = gql`
  mutation UPDATE_USER_NAME_BACKUP(
    $username: String!
    $updates: User_nameUpdateInput!
  ) {
    updateOneUser_name(query: { username: $username }, set: $updates) {
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
