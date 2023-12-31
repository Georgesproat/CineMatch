const MovieScore = require("../models/movieScore");
const Ratings = require("../models/rating");

const getRecommendedMovies = async (req, res) => {
  const userId = req.query.userId;

  try {
    // Fetch all movie scores for the user with a score above 10
    const allMovieScores = await MovieScore.find({
      user: userId,
      score: { $gt: 10 }
    }).sort({ score: -1 });

    // Fetch movies that have been rated by the user
    const userRatedMovies = await Ratings.find({
      userId
    }).distinct("movieId");

    console.log("User Rated Movies:", userRatedMovies);

    // Extract only the 'movie' field from each movieScore object
    const recommendedMovies = allMovieScores.map(
      (movieScore) => movieScore.movie
    );

    // Filter out movies that have already been rated by the user
    const filteredRecommendedMovies = recommendedMovies.filter((movieId) => {
      return !userRatedMovies.some(
        (userMovieId) =>
          userMovieId.toString().toLowerCase() ===
          movieId.toString().toLowerCase()
      );
    });

    // Limit the result to the top 20 recommended movies
    const topRecommendedMovies = filteredRecommendedMovies.slice(0, 20);

    res.json(topRecommendedMovies);
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getRecommendedMovies
};
