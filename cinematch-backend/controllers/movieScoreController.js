const MovieScore = require("../models/movieScore");
const CrewScore = require("../models/crewScore");
const CrewMember = require("../models/crewMember");
const Credit = require("../models/credit");
const Movie = require("../models/movie");

const weightings = {
  Production: 30,
  Directing: 50,
  Writing: 40,
  Editing: 20,
  Camera: 40,
  Lighting: 30,
  "Visual Effects": 20,
  Art: 20,
  "Costume & Make-Up": 15,
  Acting: 30
};

const calculateDefaultMovieScore = () => {
  console.log("Calculating Default Movie Score");
  return 5.0;
};

const calculateMovieScore = async (movieId) => {
  try {
    // Retrieve all credits for the movie
    const credits = await Credit.find({ movie: movieId });

    // Extract unique crew members from credits
    const uniqueCrewMembers = [
      ...new Set(credits.map((credit) => credit.crewMember))
    ];

    // Create objects to store total scores and counts for each department
    const departmentScores = {};
    const departmentCounts = {};

    // Calculate the weighted sum of crew scores for each department
    for (const crewMemberId of uniqueCrewMembers) {
      const crewScores = await CrewScore.find({ crewMember: crewMemberId });
      if (crewScores.length === 0) {
        continue; // Handle the case where there are no CrewScores for a crew member
      }

      // Calculate the weighted sum for this crew member
      const totalCrewScore = crewScores.reduce((acc, score) => {
        const weight = weightings[score.crewMember.knownForDepartment] || 1;
        return acc + score.score * weight;
      }, 0);

      // Update department totals and counts
      const crewMember = await CrewMember.findById(crewMemberId);
      const department = crewMember.knownForDepartment;
      if (department) {
        departmentScores[department] =
          (departmentScores[department] || 0) + totalCrewScore;
        departmentCounts[department] = (departmentCounts[department] || 0) + 1;
      }
    }

    // Calculate the average score for each department
    const departmentAverages = {};
    for (const department in departmentScores) {
      departmentAverages[department] =
        departmentScores[department] / departmentCounts[department];
    }
    // Log intermediate values
    console.log(`Department Scores:`, departmentScores);
    console.log(`Department Counts:`, departmentCounts);

    // Calculate the final movie score by averaging department scores
    const totalWeightedScore = Object.keys(departmentAverages).reduce(
      (acc, department) => {
        const weight = weightings[department] || 1;
        return acc + departmentAverages[department] * weight;
      },
      0
    );
    const averageMovieScore =
      totalWeightedScore / Object.keys(departmentAverages).length;

    console.log(
      `Calculated movie score for movieId ${movieId}: ${averageMovieScore}`
    ); 

    return averageMovieScore;
  } catch (error) {
    console.error("Error calculating movie score:", error);
    throw error;
  }
};

const createOrUpdateMovieScore = async (userId, movieId) => {
  console.log(`Creating/Updating Movie Score for Movie ID: ${movieId}`);
  try {
    // Calculate the updated movie score based on all crew member scores
    const updatedScore = await calculateMovieScore(movieId);

    // Find the existing MovieScore document or create a new one
    let existingMovieScore = await MovieScore.findOne({ movie: movieId });

    if (!existingMovieScore) {
      existingMovieScore = new MovieScore({
        user: userId,
        movie: movieId,
        score: updatedScore
      });
    } else {
      // Update the existing MovieScore
      existingMovieScore.score = updatedScore;
    }

    // Save the MovieScore document
    await existingMovieScore.save();
    console.log(`Movie Score Saved: ${existingMovieScore}`);
  } catch (error) {
    console.error(
      `Error creating or updating MovieScore for movie ${movieId}:`,
      error
    );
    throw error;
  }
};

const createOrUpdateMovieScoresForCrewMembers = async (
  crewMemberIds,
  userId,
  Credit
) => {
  try {
    // Find distinct movie IDs that have credits associated with any of the given crew member IDs
    const movieIds = await Credit.distinct("movie", {
      crewMember: { $in: crewMemberIds }
    });

    // Fetch the actual movie documents based on the extracted movie IDs
    const movies = await Movie.find({ _id: { $in: movieIds } });

    // Update MovieScores for each movie
    for (const movie of movies) {
      console.log(`Processing Movie ID: ${movie._id}`);
      // Calculate the updated movie score based on all crew member scores
      const updatedScore = await calculateMovieScore(movie._id);

      // Find the existing MovieScore document
      let existingMovieScore = await MovieScore.findOne({
        movie: movie._id,
        user: userId
      });

      if (!existingMovieScore) {
        // If it doesn't exist, create a new one
        existingMovieScore = new MovieScore({
          user: userId,
          movie: movie._id,
          score: updatedScore
        });
      } else {
        // Update the existing MovieScore
        existingMovieScore.score = updatedScore;
      }

      // Save the MovieScore document
      await existingMovieScore.save();
      console.log(
        `Movie Score Saved for Movie ID ${movie._id}: ${existingMovieScore.score}`
      );
    }
  } catch (error) {
    console.error("Error creating or updating MovieScores:", error);
    throw error;
  }
};


module.exports = {
  calculateDefaultMovieScore,
  createOrUpdateMovieScore,
  calculateMovieScore,
  createOrUpdateMovieScoresForCrewMembers
};
