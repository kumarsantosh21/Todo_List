import { gql } from "@apollo/client";

export const UPDATE_USERS = gql`
  mutation ($cloud: String!, $updates: User_nameUpdateInput!) {
    updateOneUser_name(query: { cloud: $cloud }, set: $updates) {
      user
      cloud
    }
  }
`;
