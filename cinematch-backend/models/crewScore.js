const mongoose = require("mongoose");

const crewScoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  crewMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CrewMember",
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

const CrewScore = mongoose.model("CrewScore", crewScoreSchema);

module.exports = CrewScore;
