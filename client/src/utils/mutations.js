import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DECK = gql`
  mutation adddeck($deckName: String!) {
    adddeck(deckName: $deckName) {
      _id
      deckName
      deckAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($deckId: ID!, $commentText: String!) {
    addComment(deckId: $deckId, commentText: $commentText) {
      _id
      deckName
      deckAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
