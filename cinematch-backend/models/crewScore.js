const mongoose = require("mongoose");

const crewScoreSchema = new mongoose.Schema({
  crewMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CrewMember",
    required: true
  },
  category: {
    type: String,
    enum: [
      "Storytelling",
      "Cinematography",
      "Production Value",
      "Performance",
      "Music"
    ],
    required: true
  },
  score: { type: Number, required: true }
});

module.exports = mongoose.model("CrewScore", crewScoreSchema);
