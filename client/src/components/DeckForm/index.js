import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

//Add a deck
import { ADD_DECK } from '../../utils/mutations';

//Query the deck
import { QUERY_DECKS, QUERY_ME} from '../../utils/queries';

import Auth from '../../utils/auth';

const DeckForm = () => {
  const [deckName, setDeckName] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [adddeck, { error }] = useMutation(ADD_DECK, {
    update(cache, { data: { adddeck } }) {
      try {
        const { decks } = cache.readQuery({ query: QUERY_DECKS });

        cache.writeQuery({
          query: QUERY_DECKS,
          data: { decks: [adddeck, ...decks] },
        });
      } catch (e) {
        console.error(e);
      }

       // update me object's cache
       const { me } = cache.readQuery({ query: QUERY_ME });
       cache.writeQuery({
         query: QUERY_ME,
         data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
       });
    },
  });


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await adddeck({
        variables: {
          deckName,
          deckAuthor: Auth.getProfile().data.username,
        },
      });

      setDeckName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'deckName' && value.length <= 280) {
      setDeckName(value);
      setCharacterCount(value.length);
    }
  };

  return (
    
    <div>
      <h3>What's the study topic for your new deck?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="deckName"
                placeholder="Place the name of your deck here..."
                value={deckName}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Create A Deck
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your decks. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default DeckForm;