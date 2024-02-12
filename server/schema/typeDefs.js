const typeDefs = `
  type Application {
    _id: ID
    jobId: Job
    applicantId: [User]
  }

  type Job {
    _id: ID
    title: String
    description: String
    createdAt: String
    location: String
    skills: [String]
    employerId: User
  }  

  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    firstName: String
    lastName: String
    bio: String
    location: String
    skills: [String]
    appliedJobs: [Job]
    listedJobs: [Job]
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    users(role: String!): [User!]!
    jobListings(title: String!): [Job!]!
    jobListing(_id: ID!): Job
    allJobs: [Job]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, role: String!): Auth
    addJob(title: String!, description: String!, location: String!, skills: [String!]): Job
    applyJob(jobId: ID!): Application
  }
`;

module.exports = typeDefs;
