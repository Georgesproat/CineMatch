const MovieScore = require("../models/movieScore");
const Ratings = require("../models/rating");

const getRecommendedMovies = async (req, res) => {
  const userId = req.query.userId;

  try {
    // Find high-scoring movieIds for the user
    console.log("Fetching high-scoring movies...");
    const highScoringMovies = await MovieScore.find({
      user: userId,
      score: { $gte: 8 }
    }).distinct("movie");

    console.log("High Scoring Movies:", highScoringMovies);

    // Find movies that haven't been rated by the user
    console.log("Fetching user-rated movies...");
    const userRatedMovies = await Ratings.find({ userId }).distinct("movieId");

    console.log("User Rated Movies:", userRatedMovies);

    // Filter out movies that have already been rated
    console.log("Filtering recommended movies...");
    let recommendedMovies = highScoringMovies.filter(
      (movieId) => !userRatedMovies.includes(movieId)
    );

    console.log("Recommended Movies After Filtering:", recommendedMovies);

    // Limit to the top 20 recommended movies
    recommendedMovies = recommendedMovies.slice(0, 20);

    console.log("Final Recommended Movies:", recommendedMovies);

    res.json(recommendedMovies);
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getRecommendedMovies
};
