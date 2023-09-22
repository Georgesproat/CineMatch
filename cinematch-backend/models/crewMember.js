const mongoose = require("mongoose");

const crewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true }
  // Additional crew member attributes (e.g., job title, bio)
});

module.exports = mongoose.model("CrewMember", crewMemberSchema);
