const Ratings = require("../models/rating");
const CrewScore = require("../models/crewScore");
const Credit = require("../models/credit");
const CrewMember = require("../models/crewMember");
const {
  createDefaultMovieScores,
  updateMovieScoresForCrewMembers
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

// Controller method to submit or update ratings
const submitOrUpdateRatings = async (req, res) => {
  try {
    const { movieId, userRatings } = req.body;

    if (userRatings) {
      // Check if a rating already exists for the user and movie
      const existingRating = await Ratings.findOne({
        movieId: movieId,
        userId: userRatings.userId // Assuming userId is already included in userRatings
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
          userId: userRatings.userId // Assuming userId is already included in userRatings
        });
      }

      // Fetch crew members associated with the movie and their roles
      const credits = await Credit.find({ movie: movieId }).populate(
        "crewMember"
      );

      // Calculate updated crew member ratings based on user ratings and knownForDepartment
      const crewScores = credits
        .map((credit) => {
          const crewMember = credit.crewMember;
          const knownForDepartment = crewMember.knownForDepartment;
          const category =
            knownForDepartmentToCategoryMapping[knownForDepartment];

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
            user: userRatings.userId, // Use the userId from userRatings
            crewMember: crewMember._id,
            score: userRating
          };
        })
        .filter((score) => score !== null); // Remove null entries

      // Create or update crew score entries
      await Promise.all(
        crewScores.map(async (score) => {
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
          } else {
            // Update the existing crew score by averaging with the new score
            existingCrewScore.score =
              (existingCrewScore.score + score.score) / 2;
          }

          await existingCrewScore.save();
        })
      );

      // Call the function to create default MovieScores for all movies
      await createDefaultMovieScores();

      // Call the function to update movie scores for the crew members involved
      await updateMovieScoresForCrewMembers(
        crewScores.map((score) => score.crewMember)
      );

      // Send a success response
      res.json({ message: "Ratings submitted/updated successfully" });
    } else {
      // Handle the case where userRatings is not defined
      res.status(400).json({ error: "Invalid request data" });
    }
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
