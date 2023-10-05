const mongoose = require("mongoose");

const ratingsSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie", 
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  storytellingRating: {
    type: Number,
    required: true
  },
  visualsRating: {
    type: Number,
    required: true
  },
  productionValueRating: {
    type: Number,
    required: true
  },
  performanceRating: {
    type: Number,
    required: true
  }
});

const Ratings = mongoose.model("Ratings", ratingsSchema);

module.exports = Ratings;
