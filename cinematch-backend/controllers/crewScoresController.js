const CrewScore = require("../models/crewScore");

// Create a new crew score
const createCrewScore = async (req, res) => {
  try {
    const { user, crewMember, score } = req.body;

    // Create a new crew score entry
    const newCrewScore = new CrewScore({
      user,
      crewMember,
      score
    });

    // Save the crew score to the database
    await newCrewScore.save();

    res.json({ message: "Crew score submitted successfully" });
  } catch (error) {
    console.error("Error submitting crew score:", error);
    res.status(500).json({ error: "Failed to submit crew score" });
  }
};

module.exports = {
  createCrewScore
};
