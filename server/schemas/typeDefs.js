const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]!
  }

  type Deck {
    _id: ID
    deckName: String
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
    decks(username: String): [Deck]
    deck(deckId: ID!): Deck
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    adddeck(deckName: String!): Deck
    addComment(deckId: ID!, commentText: String!): Deck
    removedeck(deckId: ID!): Deck
    removeComment(deckId: ID!, commentId: ID!): Deck
  }
`;

module.exports = typeDefs;
