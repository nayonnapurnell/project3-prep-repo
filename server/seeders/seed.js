const db = require('../config/connection');
const { User, deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const deckSeeds = require('./deckSeeds.json');

db.once('open', async () => {
  try {
    await Deck.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < deckSeeds.length; i++) {
      const { _id, deckAuthor } = await deck.create(deckSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: deckAuthor },
        {
          $addToSet: {
            decks: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
