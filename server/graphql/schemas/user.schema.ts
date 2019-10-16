import { gql } from 'apollo-server-express';

export default gql`
  type Token {
    token: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: Date!
  }

  type UserConnection {
    pageInfo: PageInfo!
    nodes: [User!]
    totalCount: Int!
  }
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

  extend type Query {
    users(offset: Int, limit: Int): [User!]
    usersByCursor(cursor: String, limit: Int): UserConnection!
    user(id: ID): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
    ): Token!
    signIn(username: String!, password: String!): Token!
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(username: String!): User!
    deleteUser(id: ID!): User!
  }
`;