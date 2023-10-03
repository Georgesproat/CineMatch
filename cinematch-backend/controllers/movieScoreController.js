const MovieScore = require("../models/movieScore");
const CrewScore = require("../models/crewScore");
const CrewMember = require("../models/crewMember");
const Movie = require("../models/movie");

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

// Function to calculate the default movie score (you can customize this logic)
const calculateDefaultMovieScore = async (movieId) => {
  // Calculate the default score logic (e.g., average based on other data)
  // Replace this with your own logic
  const defaultScore = 5.0; // Example default score
  return defaultScore;
};

// Function to create default MovieScore entries for all movies
const createDefaultMovieScores = async (userId) => {
  try {
    const allMovies = await Movie.find({}); // Fetch all movies

    for (const movie of allMovies) {
      const existingMovieScore = await MovieScore.findOne({ movie: movie._id });

      if (!existingMovieScore) {
        // Calculate an average score for the movie (you can modify this logic)
        const defaultScore = await calculateDefaultMovieScore(movie._id);

        // Create a new MovieScore entry with the default score and user
        await MovieScore.create({
          movie: movie._id,
          score: defaultScore,
          user: userId // Set the user ID from the parameter
        });
      }
    }
  } catch (error) {
    console.error("Error creating default MovieScores:", error);
    throw error;
  }
};

// Function to update movie scores for all movies associated with crew members
const updateMovieScoresForCrewMembers = async (crewMemberIds, userId) => {
  try {
    // Retrieve movie IDs associated with the crew members
    const movieIdsToUpdate = await CrewScore.distinct("movie", {
      crewMember: { $in: crewMemberIds }
    });

    for (const movieId of movieIdsToUpdate) {
      // Retrieve crew scores associated with the movie
      const crewScores = await CrewScore.find({ movie: movieId });

      // Calculate the updated movie score based on weighted crew scores
      const weightedCrewScores = calculateWeightedCrewScores(crewScores);
      const updatedScore = calculateMovieScore(weightedCrewScores);

      // Create or update the MovieScore document
      await createOrUpdateMovieScore(movieId, updatedScore, userId);
    }
  } catch (error) {
    console.error("Error updating movie scores for crew members:", error);
    throw error;
  }
};

// Function to create or update a MovieScore document
const createOrUpdateMovieScore = async (movieId, updatedScore, userId) => {
  try {
    // Find the existing MovieScore document or create a new one
    let existingMovieScore = await MovieScore.findOne({ movie: movieId });

    if (!existingMovieScore) {
      existingMovieScore = new MovieScore({
        movie: movieId,
        score: updatedScore,
        user: userId // Set the user ID from the parameter
      });
    } else {
      // Update the existing MovieScore
      existingMovieScore.score = updatedScore;
      existingMovieScore.user = userId; // Set the user ID from the parameter
      await existingMovieScore.save();
    }
  } catch (error) {
    console.error(
      `Error creating or updating MovieScore for movie ${movieId}:`,
      error
    );
    throw error;
  }
};

// Function to calculate weighted crew scores
const calculateWeightedCrewScores = (crewScores) => {
  return crewScores.map((score) => {
    const weight = weightings[score.crewMember.role] || 1; // Default weight is 1
    score.score *= weight; // Apply the weight to the score
    return score;
  });
};

// Function to calculate the movie score based on weighted crew scores
const calculateMovieScore = (weightedCrewScores) => {
  if (weightedCrewScores.length === 0) {
    return 0;
  }
  const totalScore = weightedCrewScores.reduce(
    (acc, score) => acc + score.score,
    0
  );
  return totalScore / weightedCrewScores.length;
};

module.exports = {
  createDefaultMovieScores,
  updateMovieScoresForCrewMembers
};
