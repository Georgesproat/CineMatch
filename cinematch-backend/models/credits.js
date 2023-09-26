const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  crewMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CrewMember",
    required: true
  },
  role: { type: String, required: true }
  // Additional credit attributes if needed
});

module.exports = mongoose.model("Credit", creditSchema);
