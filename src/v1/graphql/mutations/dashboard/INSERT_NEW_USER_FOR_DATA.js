import { gql } from "@apollo/client";

export const INSERT_NEW_USER_FOR_DATA = gql`
  mutation ($datas: DatumInsertInput!) {
    insertOneDatum(data: $datas) {
      _id
      username
      message
    }
  }
`;
