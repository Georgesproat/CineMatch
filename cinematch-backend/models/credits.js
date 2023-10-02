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
  role: String, // Store the determined crew role here
  department: String, // Store the department from TMDB data
  job: String, // Store the job from TMDB data
  character: String, // Character name for actors
  knownForDepartment: String, // Known for department for actors
  popularity: Number // Popularity score for the crew member
});

module.exports = mongoose.model("Credit", creditSchema);
