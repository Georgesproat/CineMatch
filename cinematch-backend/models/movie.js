const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tmdbId: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  posterImageUrl: { type: String },
  backdropImageUrl: { type: String },
  genres: [{ type: String }], 

});

module.exports = mongoose.model("Movie", movieSchema);
