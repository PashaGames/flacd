const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  nextDate: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    required: true,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = Flashcard;