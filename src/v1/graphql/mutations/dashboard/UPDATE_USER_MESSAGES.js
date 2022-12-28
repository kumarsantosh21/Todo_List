import { gql } from "@apollo/client";

export const UPDATE_USER_MESSAGES = gql`
  mutation UPDATE_USER_MESSAGES(
    $username: String!
    $updates: DatumUpdateInput!
  ) {
    updateOneDatum(query: { username: $username }, set: $updates) {
      username
      message
      title
    }
  }
`;
