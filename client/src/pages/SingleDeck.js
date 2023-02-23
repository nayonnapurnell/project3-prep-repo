import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_DECK } from '../utils/queries';

const SingleDeck = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { deckId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_DECK, {
    // pass URL parameter
    variables: { deckId: deckId },
  });

  const deck = data?.deck || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {deck.deckAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this deck on {deck.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {deck.deckText}
        </blockquote>
      </div>

      <div className="my-5">
        <CommentList comments={deck.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm deckId={deck._id} />
      </div>
    </div>
  );
};

export default SingleDeck;
