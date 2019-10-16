# graphql-fullstack-demo (maintaining...)
A simple Angular7 + Apollo + GraphQL + NodeJs + Express + MongoDB CRUD

# Features
- Angular7 with Apollo Client 2
   - Queries, Mutations, Subscriptions
   - graphql-codegen
- Node.js with Express and Apollo Server 2
   - offset/limit pagination
   - cursor-based Pagination
- MongoDB Database with mongoose (ORM)
   - entities: users
- Authentication
   - powered by JWT and local storage
   - Sign Up, Sign In
- Authorization
   - protected endpoint (e.g. verify valid token)

# Installation
- clone
   - git clone xxx
   - cd graphql-fullstack-demo
- client
   - cd client
   - npm install
   - npm start
   - visit http://localhost:4200
- server
   - cd server
   - npm install
   - install mongodb in local machine and configure with mongoose url
   - npm start
   - visit GraphQL Playground: http://localhost:8080/graphql