const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tmdbId: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  averageRating: { type: Number, default: 0 },
  posterImageUrl: { type: String },
  backdropImageUrl: { type: String },

  ratings: {
    storytelling: { type: Number, default: 0 },
    cinematography: { type: Number, default: 0 },
    productionValue: { type: Number, default: 0 },
    performance: { type: Number, default: 0 },
    music: { type: Number, default: 0 }
  },
  crewScores: [
    {
      crewMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CrewMember",
        required: true
      },
      storytelling: { type: Number, default: 0 },
      visuals: { type: Number, default: 0 },
      productionValue: { type: Number, default: 0 },
      performance: { type: Number, default: 0 },
      music: { type: Number, default: 0 }
      
    }
  ],

  credits: [
    {
      crewMember: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CrewMember",
        required: true
      },
      role: String
    }
  ]
});

module.exports = mongoose.model("Movie", movieSchema);
