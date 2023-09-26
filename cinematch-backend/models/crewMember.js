const mongoose = require("mongoose");

const crewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Additional crew member attributes (e.g., job title, bio)
  tmdbId: { type: Number, required: true, unique: true },
  profileImageUrl: { type: String }
});

module.exports = mongoose.model("CrewMember", crewMemberSchema);
