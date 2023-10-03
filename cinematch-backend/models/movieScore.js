const mongoose = require("mongoose");

const movieScoreSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  score: Number
  
});

const MovieScore = mongoose.model("MovieScore", movieScoreSchema);

module.exports = MovieScore;
