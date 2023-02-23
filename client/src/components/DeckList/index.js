import React from 'react';
import { Link } from 'react-router-dom';

const DeckList = ({
  decks,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!decks.length) {
    return <h3>No decks Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {decks &&
        decks.map((deck) => (
          <div key={deck._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${deck.deckAuthor}`}
                >
                  {deck.deckAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    created this deck on {deck.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You created this deck on {deck.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{deck.deckName}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/decks/${deck._id}`}
            >
              View the cards on this deck.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default DeckList;
