import { AuthenticationError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { isAuthenticated } from './authorization';

/**
 * @param {object} user 
 * @param {string} secret 私钥或者加密算法（默认HMAC SHA256）
 * @param {string} expiresIn 过期时间，默认毫秒
 */
const createToken = async (user, secret, expiresIn) => {
  const { id, username, email } = user;
  return await jwt.sign({ id, username, email }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    // pagination: offset/limit
    users: combineResolvers(
      isAuthenticated,
      async (
        parent, 
        { offset = 0, limit = 5 }, 
        { models: { userModel } }
      ) => {
        return await userModel
          .find()
          .skip(offset)
          .limit(limit)
          .sort({
            // 1表示升序，-1表示降序
            createdAt: -1
          })
          .exec();
      }
    ),
    // pagination: cursor/limit
    usersByCursor: combineResolvers(
      isAuthenticated,
      async (
        parent, 
        { cursor, limit = 5 }, 
        { models: { userModel } }
      ) => {
        // 降序查后面的元素
        const cursorAfterOptions = cursor 
        ? {
            'createdAt': {
              $lt: cursor
            }
          }
        : {};
        const afterUsers = await userModel
          .find(cursorAfterOptions)
          .sort({
            // 1表示升序，-1表示降序
            createdAt: -1
          })
          .exec();

        const hasNextPage = afterUsers.length > limit;
        const nodes = hasNextPage ? afterUsers.slice(0, -1) : afterUsers;
        const startCursor = nodes[0].createdAt.toString()
        const endCursor = nodes[nodes.length - 1].createdAt.toString()
        // 降序查前面的元素
        const cursorBeforeOptions = {
          'createdAt': {
            $gt: startCursor
          }
        };
        const beforeUsers = await userModel
          .find(cursorBeforeOptions)
          .sort({
            // 1表示升序，-1表示降序
            createdAt: -1
          })
          .exec();
        // todo
        const hasPreviousPage = beforeUsers.length - 1

        return {
          pageInfo: {
            hasNextPage,
            hasPreviousPage,
            startCursor,
            endCursor,
          },
          nodes,
          totalCount: afterUsers.length + beforeUsers.length - 1
        }
      }
    ),
    user: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { id },
        { models: { userModel } }
      ) => {
        return await userModel.findById({ _id: id }).exec();
      }
    ),
    me: combineResolvers(
      isAuthenticated,
      async (
        parent,
        args,
        { models: { userModel }, me }
      ) => {
        if (!me) {
          return null;
        }
        return await userModel.findById(me.id);
      }
    )
  },
  Mutation: {
    signUp: async (
      parent, 
      { username, email, password }, 
      { models: { userModel }, secret }
    ) => {
      const date = new Date();
      const user = await userModel.create({
        username,
        email,
        password,
        createdAt: date.setSeconds(date.getSeconds() + 1)
      });

      return {
        token: createToken(user, secret, '300m')
      };
    },
    signIn: async (
      parent, 
      { username, password },
      { models: { userModel }, secret }
    ) => {
      const user = await userModel.findOne({ username }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      return {
        token: createToken(user, secret, '300m')
      };
    },
    createUser: async (
      parent,
      { username, email, password },
      { models: { userModel } }
    ) => {
      const date = new Date();
      const user = await userModel.create({
        username,
        email,
        password,
        createdAt: date.setSeconds(date.getSeconds() + 1)
      });

      if (!user) {
        throw new Error('Create User Error')
      }

      return user;
    },
    deleteUser: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { id },
        { models: { userModel }}
      ) => {
        const deleteUser = await userModel.findByIdAndRemove({ _id: id }).exec();
        
        if (!deleteUser) {
          throw new Error('Delete User Error')
        }

        return deleteUser;
      }
    )
  }
}