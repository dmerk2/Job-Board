import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Adduser(
    $username: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      role: $role
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_JOB = gql`
  mutation AddJob($title: String!, $description: String!, $location: String!) {
    addJob(title: $title, description: $description, location: $location) {
      _id
      title
      description
      location
      createdAt
      skills
    }
  }
`;
