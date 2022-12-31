import { gql } from "@apollo/client";

export const INSERT_NEW_USER_FOR_DATA = gql`
  mutation INSERT_NEW_USER($datas: DatumInsertInput!) {
    insertOneDatum(data: $datas) {
      _id
      username
      message
      title
      lastmodified
      backupstatus
    }
  }
`;
