const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [deck]!
  }

  type Deck {
    _id: ID
    deckText: String
    deckAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    decks(username: String): [deck]
    deck(deckId: ID!): deck
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    adddeck(deckText: String!): deck
    addComment(deckId: ID!, commentText: String!): deck
    removedeck(deckId: ID!): deck
    removeComment(deckId: ID!, commentId: ID!): deck
  }
`;

module.exports = typeDefs;
