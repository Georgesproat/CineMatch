const Ratings = require("../models/rating");
const CrewScore = require("../models/crewScore");
const CrewMember = require("../models/crewMember");

const submitRatings = async (req, res) => {
  try {
    const { movieId, userRatings, userId } = req.body;

    // Store user ratings in the database
    const newRatings = await Ratings.create({
      movieId,
      storytellingRating: userRatings.storytelling,
      visualsRating: userRatings.visuals,
      productionValueRating: userRatings.productionValue,
      performanceRating: userRatings.performance,
      userId // Store the user ID
    });

    // Fetch crew members associated with the movie
    const crewMembers = await CrewMember.find({ movie: movieId });

    // Calculate updated crew member ratings based on user ratings
    const crewScores = crewMembers.map((crewMember) => {
      // Calculate the average of user ratings for different categories
      const averageUserRating =
        (userRatings.storytelling +
          userRatings.visuals +
          userRatings.productionValue +
          userRatings.performance) /
        4; // Assuming 4 categories

      return {
        user: userId,
        crewMember: crewMember._id,
        score: averageUserRating
      };
    });

    // Create crew score entries
    await CrewScore.insertMany(crewScores);

    // Send a success response
    res.json({ message: "Ratings submitted successfully" });
  } catch (error) {
    console.error("Error submitting ratings:", error);
    res.status(500).json({ error: "Failed to submit ratings" });
  }
};

module.exports = {
  submitRatings
};
