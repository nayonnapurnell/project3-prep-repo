const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const deckschema = new Schema({
  deckText: {
    type: String,
    required: 'You need to leave a deck!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  deckAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const deck = model('deck', deckschema);

module.exports = deck;
