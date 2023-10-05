const Ratings = require("../models/rating");
const CrewScore = require("../models/crewScore");
const Credit = require("../models/credit");
const User = require("../models/user");
const Movie = require("../models/movie");
const {
  createOrUpdateMovieScore,
  createOrUpdateMovieScoresForCrewMembers
} = require("../controllers/movieScoreController");

const knownForDepartmentToCategoryMapping = {
  Production: "storytelling",
  Writing: "storytelling",
  Directing: "storytelling",
  Editing: "visuals",
  Camera: "visuals",
  Lighting: "visuals",
  "Visual Effects": "productionValue",
  Art: "productionValue",
  "Costume & Make-Up": "productionValue",
  Acting: "performance"
};

const submitOrUpdateRatings = async (req, res) => {
  try {
    const { movieId, userRatings, userId } = req.body;

    if (!userRatings) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Check if a rating already exists for the user and movie
    const existingRating = await Ratings.findOne({
      movieId: movieId,
      userId: userId
    });

    if (existingRating) {
      // Update the existing rating
      existingRating.storytellingRating = userRatings.storytelling;
      existingRating.visualsRating = userRatings.visuals;
      existingRating.productionValueRating = userRatings.productionValue;
      existingRating.performanceRating = userRatings.performance;

      await existingRating.save();
    } else {
      // Create a new rating entry
      await Ratings.create({
        movieId,
        storytellingRating: userRatings.storytelling,
        visualsRating: userRatings.visuals,
        productionValueRating: userRatings.productionValue,
        performanceRating: userRatings.performance,
        userId
      });
    }

    // Fetch crew members associated with the movie and their roles
    const credits = await Credit.find({ movie: movieId }).populate(
      "crewMember"
    );

    // Calculate updated crew member ratings based on user ratings and knownForDepartment
    const crewScores = credits.map((credit) => {
      const crewMember = credit.crewMember;

      if (!crewMember) {
        // Handle the case where crewMember is null or undefined
        console.log("Crew member not found for credit:", credit);
        return null;
      }

      const knownForDepartment = crewMember.knownForDepartment;

      if (!knownForDepartment) {
        // Handle the case where knownForDepartment is null
        console.log(
          `No knownForDepartment found for crew member: ${crewMember.name}`
        );
        return null;
      }

      const category = knownForDepartmentToCategoryMapping[knownForDepartment];

      if (!category) {
        // Handle the case where the knownForDepartment doesn't have a mapping
        console.log(
          `No mapping found for knownForDepartment: ${knownForDepartment}`
        );
        return null;
      }

      // Use the user rating for the corresponding category
      const userRating = userRatings[category];

      // Logging for debugging
      console.log(`Processing crew member: ${crewMember.name}`);
      console.log(
        `knownForDepartment: ${knownForDepartment}, Category: ${category}, User Rating: ${userRating}`
      );

      return {
        user: userId,
        crewMember: crewMember._id,
        score: userRating
      };
    });

    // Remove null entries from crewScores
    const validCrewScores = crewScores.filter((score) => score !== null);

    // Get a list of unique crew members whose scores have changed
    const changedCrewMemberIds = Array.from(
      new Set(validCrewScores.map((score) => score.crewMember))
    );

    // Update crew scores asynchronously
    await Promise.all(
      validCrewScores.map(async (score) => {
        try {
          // Find the existing crew score or create a new one
          let existingCrewScore = await CrewScore.findOne({
            user: score.user,
            crewMember: score.crewMember
          });

          if (!existingCrewScore) {
            existingCrewScore = new CrewScore({
              user: score.user,
              crewMember: score.crewMember,
              score: score.score
            });
          }

          // Update the existing crew score by averaging with the new score
          existingCrewScore.score = (existingCrewScore.score + score.score) / 2;

          await existingCrewScore.save();
        } catch (error) {
          console.error(
            `Error processing crew member: ${score.crewMember}, User: ${score.user}, Score: ${score.score}`
          );
          console.error("Error details:", error);
        }
      })
    );

    // Log the completion of crew score updates
    console.log("Crew Scores Updated");

    // Calculate updatedScore based on crewScores
    const totalCrewScores = validCrewScores.reduce(
      (sum, score) => sum + score.score,
      0
    );
    const updatedScore = totalCrewScores / validCrewScores.length;

    // Create or update the MovieScore with the user and movie information
    await createOrUpdateMovieScore(userId, movieId);

  

    // Update MovieScores for all movies associated with the crew members
    await createOrUpdateMovieScoresForCrewMembers(
      changedCrewMemberIds,
      userId,
      Credit
    );

    // Send a success response
    res.json({ message: "Ratings submitted/updated successfully" });
  } catch (error) {
    console.error("Error submitting/updating ratings:", error);
    res.status(500).json({ error: "Failed to submit/update ratings" });
  }
};

// Controller method to fetch user ratings by movie ID and user ID
const getUserRatings = async (req, res) => {
  try {
    const { movieId, userId } = req.params;

    // Query your database to fetch user ratings for the specified movie and user
    const userRatings = await Ratings.findOne({
      movieId: movieId,
      userId: userId
    });

    if (!userRatings) {
      return res.status(404).json({ error: "User ratings not found" });
    }

    // Return the user ratings as JSON response
    res.json({ ratings: userRatings });
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    res.status(500).json({ error: "Failed to fetch user ratings" });
  }
};

module.exports = {
  submitOrUpdateRatings,
  getUserRatings
};
