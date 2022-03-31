import { gql } from "@apollo/client";

export const UPDATE_USER_MESSAGES = gql`
  mutation ($username: String!, $updates: DatumUpdateInput!) {
    updateOneDatum(query: { username: $username }, set: $updates) {
      username
      message
    }
  }
`;
