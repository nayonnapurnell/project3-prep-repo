const db = require('../config/connection');
const { User, deck } = require('../models');
const userSeeds = require('./userSeeds.json');
const deckseeds = require('./deckseeds.json');

db.once('open', async () => {
  try {
    await deck.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < deckseeds.length; i++) {
      const { _id, deckAuthor } = await deck.create(deckseeds[i]);
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
