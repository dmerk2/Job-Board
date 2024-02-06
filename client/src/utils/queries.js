import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsers($role: String!) {
    users(role: $role) {
      _id
      username
      email
      role
      firstName
      lastName
      bio
    }
  }
`;
