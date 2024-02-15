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

export const QUERY_USER = gql`
  query getUser {
    user {
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

export const QUERY_JOBS = gql`
  query getJobs($title: String!) {
    jobListings(title: $title) {
      _id
      title
    }
  }
`;

export const QUERY_ALL_JOBS = gql`
  query {
    allJobs {
      _id
      title
      description
      createdAt
      location
      skills
      employerId {
        _id
        username
      }
    }
  }
`;

export const QUERY_JOB = gql`
  query getJob($id: ID!) {
    jobListing(_id: $id) {
      _id
      title
      description
      createdAt
      location
      skills
      employerId {
        _id
        username
      }
    }
  }
`;
