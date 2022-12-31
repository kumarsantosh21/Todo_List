import { gql } from "@apollo/client";

export const INSERT_USER_MAIN = gql`
  mutation INSERT_USER_MAIN($datas: User_nameInsertInput!) {
    insertOneUser_name(data: $datas) {
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
