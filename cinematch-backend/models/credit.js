const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  crewMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CrewMember",
    required: true
  },
  role: String, 
  department: String, 
  job: String, 
  character: String, 
  knownForDepartment: String, 
  popularity: Number 
});

module.exports = mongoose.model("Credit", creditSchema);
