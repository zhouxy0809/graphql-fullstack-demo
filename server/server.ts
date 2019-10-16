import { 
  ApolloServer,
  AuthenticationError
} from 'apollo-server-express';
import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';

import mongoose from './config/mongoose.config';
import schema from './graphql/schemas/index';
import resolvers from './graphql/resolvers/index';
import userModel from './models/user.model';

const PORT = process.env.PORT || 8080;
const app = express();
// connect to mongoose
const db = mongoose();
const secret = process.env.SECRET || 'asdlplplfwfwefwekwself.2342.dawasdq'

app.use(cors());

const getMe = async req => {
  const token = req.headers['token'];

  // 验证token的合法性：是否有效或者过期
  if (token) {
    try {
      return await jwt.verify(token, secret);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getMe(req);

      return {
        models: {
          userModel
        },
        me,
        secret
      }
    }
  }
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Graphql Apollo Server is running on http://localhost:${PORT}/${server.graphqlPath}`);
});