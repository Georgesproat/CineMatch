const MovieScore = require("../models/movieScore");
const CrewScore = require("../models/crewScore");

const applyWeights = (crewScores) => {
  // Define your weightings (these are example weights)
  const weightings = {
    Production: 2,
    Directing: 5,
    Writing: 4,
    Editing: 3,
    Camera: 3,
    Lighting: 1.5,
    "Visual Effects": 1.5,
    Art: 1.5,
    "Costume & Make-Up": 1.5,
    Acting: 4
    // Add more roles and departments with their respective weights
  };

  // Apply weights to crew scores
  const weightedCrewScores = crewScores.map((score) => {
    // Check the role or department and apply the corresponding weight
    const weight = weightings[score.crewMember.role] || 1; // Default weight is 1
    score.score *= weight; // Apply the weight to the score
    return score;
  });

  return weightedCrewScores;
};

const calculateMovieScore = async (movieId) => {
  try {
    // Retrieve crew scores associated with the movie
    const crewScores = await CrewScore.find({ movie: movieId });

    // Apply weights to crew scores
    const weightedCrewScores = applyWeights(crewScores);

    // Calculate the movie score based on weighted crew scores
    const totalScore = weightedCrewScores.reduce(
      (acc, score) => acc + score.score,
      0
    );
    const totalWeight = weightedCrewScores.length;

    // Calculate the movie score as the average of crew scores
    const movieScore = totalWeight === 0 ? 0 : totalScore / totalWeight;

    // Store or update the movie score in the database
    await MovieScore.findOneAndUpdate(
      { movie: movieId },
      { score: movieScore },
      { upsert: true, new: true }
    );

    return movieScore;
  } catch (error) {
    console.error(`Error calculating movie score for movie ${movieId}:`, error);
    throw error;
  }
};

module.exports = {
  calculateMovieScore
};
