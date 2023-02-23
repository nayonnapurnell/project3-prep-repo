import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      decks {
        _id
        deckText
        createdAt
      }
    }
  }
`;

export const QUERY_DECKS = gql`
  query getdecks {
    decks {
      _id
      deckText
      deckAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_DECK = gql`
  query getSingledeck($deckId: ID!) {
    deck(deckId: $deckId) {
      _id
      deckText
      deckAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      decks {
        _id
        deckText
        deckAuthor
        createdAt
      }
    }
  }
`;
