const Movie = require("../models/movie");
const mongoose = require("mongoose");


// Get all movies with pagination
const getAllMovies = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const totalMovies = await Movie.countDocuments();

    if (!page || !limit || isNaN(page) || isNaN(limit)) {
      return res.status(400).json({ error: "Invalid page or limit parameters" });
    }

    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({ movies, totalMovies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a movie by its ID
const getMovieById = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.error("Error in getMovieById:", error);

    if (error instanceof mongoose.Error.CastError) {
      // Handle invalid ObjectId format
      return res.status(400).json({ error: "Invalid movie ID format" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

// Search for movies by title
const searchMoviesByTitle = async (req, res) => {
  try {
    const searchTerm = req.query.term;

    const movies = await Movie.find({
      title: { $regex: searchTerm, $options: "i" }, 
    });

    res.json({ results: movies });
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).json({ error: "An error occurred during the search." });
  }
};

const submitMovieRating = async (req, res) => {
  const { movieId } = req.params;
  const { userId, ratings } = req.body;

  try {
    // Find the movie by ID
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Update ratings for each category
    Object.keys(ratings).forEach((category) => {
      movie.ratings[category] = ratings[category];
    });

    // Map ratings to crew members based on credits
    movie.credits.forEach((credit) => {
      // Find the corresponding crew member by ID
      const crewMember = credit.crewMember;

      // Map ratings to crew members based on roles
      switch (credit.role) {
        case "director":
        case "creator":
        case "writer":
          crewMember.storytelling += ratings.storytelling;
          break;
        case "camera":
        case "lighting":
        case "editing":
          crewMember.visuals += ratings.visuals;
          break;
        case "art":
        case "hairMakeup":
        case "props":
          crewMember.productionValue += ratings.productionValue;
          break;
        case "casting":
        case "actor":
          crewMember.performance += ratings.performance;
          break;
        case "sound":
          crewMember.music += ratings.music;
          break;
        
      }
    });

    // Save the updated movie and crew members
    await movie.save();

    res.status(200).json({ message: "Ratings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Retrieve ratings and reviews for a movie
const getRatingsAndReviews = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    // Find the movie by ID and project the ratings and reviews field
    const movie = await Movie.findById(movieId, "ratingsAndReviews");

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json({ ratingsAndReviews: movie.ratingsAndReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getRatingsAndReviews,
  submitMovieRating,
  getMovieById,
  getAllMovies,
  searchMoviesByTitle
};
