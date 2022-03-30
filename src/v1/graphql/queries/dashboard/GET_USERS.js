import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    user_name {
      _id
      user
    }
  }
`;
