const mongoose = require("mongoose");

const crewMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tmdbId: { type: Number, required: true, unique: true },
  profileImageUrl: { type: String },
  biography: { type: String },
  birthdate: { type: Date },
  birthplace: { type: String },
  knownForDepartment: { type: String },
  gender: { type: String },
  creditsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("CrewMember", crewMemberSchema);
