import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type Mutation = {
  __typename?: "Mutation";
  _?: Maybe<Scalars["Boolean"]>;
  signUp: Token;
  signIn: Token;
  createUser: User;
  updateUser: User;
  deleteUser: User;
};

export type MutationSignUpArgs = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationSignInArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateUserArgs = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  username: Scalars["String"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
  endCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  _?: Maybe<Scalars["Boolean"]>;
  users?: Maybe<Array<User>>;
  usersByCursor: UserConnection;
  user?: Maybe<User>;
  me?: Maybe<User>;
};

export type QueryUsersArgs = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryUsersByCursorArgs = {
  cursor?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["ID"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  _?: Maybe<Scalars["Boolean"]>;
};

export type Token = {
  __typename?: "Token";
  token: Scalars["String"];
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["Date"];
};

export type UserConnection = {
  __typename?: "UserConnection";
  pageInfo: PageInfo;
  nodes?: Maybe<Array<User>>;
  totalCount: Scalars["Int"];
};
export type PageInfoFragment = { __typename?: "PageInfo" } & Pick<
  PageInfo,
  "hasNextPage" | "hasPreviousPage" | "startCursor" | "endCursor"
>;

export type UserInfoFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email" | "createdAt"
>;

export type UserInfoQueryQueryVariables = {
  id: Scalars["ID"];
};

export type UserInfoQueryQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserInfoFragment>;
};

export type UsersQueryQueryVariables = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type UsersQueryQuery = { __typename?: "Query" } & {
  users: Maybe<Array<{ __typename?: "User" } & UserInfoFragment>>;
};

export type UsersByCursorQueryQueryVariables = {
  cursor?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type UsersByCursorQueryQuery = { __typename?: "Query" } & {
  usersByCursor: { __typename?: "UserConnection" } & {
    pageInfo: { __typename?: "PageInfo" } & PageInfoFragment;
    nodes: Maybe<Array<{ __typename?: "User" } & UserInfoFragment>>;
  };
};

export type UsersCountQueryQueryVariables = {
  cursor?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type UsersCountQueryQuery = { __typename?: "Query" } & {
  usersByCursor: { __typename?: "UserConnection" } & Pick<
    UserConnection,
    "totalCount"
  >;
};

export type CreateUserMutationMutationVariables = {
  username: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type CreateUserMutationMutation = { __typename?: "Mutation" } & {
  createUser: { __typename?: "User" } & UserInfoFragment;
};

export type UpdateUserMutationMutationVariables = {
  username: Scalars["String"];
};

export type UpdateUserMutationMutation = { __typename?: "Mutation" } & {
  updateUser: { __typename?: "User" } & UserInfoFragment;
};

export type DeleteUserMutationMutationVariables = {
  id: Scalars["ID"];
};

export type DeleteUserMutationMutation = { __typename?: "Mutation" } & {
  deleteUser: { __typename?: "User" } & UserInfoFragment;
};
export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    email
    createdAt
  }
`;
export const UserInfoQueryDocument = gql`
  query userInfoQuery($id: ID!) {
    user(id: $id) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UserInfoQueryGQL extends Apollo.Query<
  UserInfoQueryQuery,
  UserInfoQueryQueryVariables
> {
  document = UserInfoQueryDocument;
}
export const UsersQueryDocument = gql`
  query usersQuery($offset: Int, $limit: Int) {
    users(offset: $offset, limit: $limit) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UsersQueryGQL extends Apollo.Query<
  UsersQueryQuery,
  UsersQueryQueryVariables
> {
  document = UsersQueryDocument;
}
export const UsersByCursorQueryDocument = gql`
  query usersByCursorQuery($cursor: String, $limit: Int) {
    usersByCursor(cursor: $cursor, limit: $limit) {
      pageInfo {
        ...PageInfo
      }
      nodes {
        ...UserInfo
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${UserInfoFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UsersByCursorQueryGQL extends Apollo.Query<
  UsersByCursorQueryQuery,
  UsersByCursorQueryQueryVariables
> {
  document = UsersByCursorQueryDocument;
}
export const UsersCountQueryDocument = gql`
  query usersCountQuery($cursor: String, $limit: Int) {
    usersByCursor(cursor: $cursor, limit: $limit) {
      totalCount
    }
  }
`;

@Injectable({
  providedIn: "root"
})
export class UsersCountQueryGQL extends Apollo.Query<
  UsersCountQueryQuery,
  UsersCountQueryQueryVariables
> {
  document = UsersCountQueryDocument;
}
export const CreateUserMutationDocument = gql`
  mutation createUserMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createUser(username: $username, email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class CreateUserMutationGQL extends Apollo.Mutation<
  CreateUserMutationMutation,
  CreateUserMutationMutationVariables
> {
  document = CreateUserMutationDocument;
}
export const UpdateUserMutationDocument = gql`
  mutation updateUserMutation($username: String!) {
    updateUser(username: $username) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateUserMutationGQL extends Apollo.Mutation<
  UpdateUserMutationMutation,
  UpdateUserMutationMutationVariables
> {
  document = UpdateUserMutationDocument;
}
export const DeleteUserMutationDocument = gql`
  mutation deleteUserMutation($id: ID!) {
    deleteUser(id: $id) {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class DeleteUserMutationGQL extends Apollo.Mutation<
  DeleteUserMutationMutation,
  DeleteUserMutationMutationVariables
> {
  document = DeleteUserMutationDocument;
}
