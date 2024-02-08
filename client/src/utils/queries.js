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
    appliedJobs {
      _id
      title
      description
      createdAt
      location
    }
    listedJobs {
      _id
      title
      description
      createdAt
      location
    }
    location
    skills
    }
  }
`;
