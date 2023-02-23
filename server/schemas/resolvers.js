const { AuthenticationError } = require('apollo-server-express');
const { User, Deck } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('decks');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('decks');
    },
    decks: async (parent, { username }) => {
      const params = username ? { username } : {};
      return deck.find(params).sort({ createdAt: -1 });
    },
    deck: async (parent, { deckId }) => {
      return deck.findOne({ _id: deckId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('decks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    adddeck: async (parent, { deckName }, context) => {
      if (context.user) {
        const deck = await Deck.create({
          deckName,
          deckAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { decks: deck._id } }
        );

        return deck;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { deckId, commentText }, context) => {
      if (context.user) {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removedeck: async (parent, { deckId }, context) => {
      if (context.user) {
        const deck = await Deck.findOneAndDelete({
          _id: deckId,
          deckAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { decks: deck._id } }
        );

        return deck;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { deckId, commentId }, context) => {
      if (context.user) {
        return Deck.findOneAndUpdate(
          { _id: deckId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
