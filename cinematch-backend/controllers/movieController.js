const Movie = require("../models/movie");


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

    if (!movieId) {
      return res
        .status(400)
        .json({ error: "Movie ID is missing in the request" });
    }

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

// Submit a rating and review for a movie
const submitRatingAndReview = async (req, res) => {
  try {
    // Access user ID from JWT token
    const userId = req.user.id;

    // Extract data from the request body
    const { rating, review } = req.body;
    const movieId = req.params.movieId;

    // Validate user input
    if (!rating || rating < 1 || rating > 10) {
      return res.status(400).json({ message: "Invalid rating." });
    }

    // Create a new rating and review document
    const newRatingAndReview = {
      user: userId,
      movie: movieId,
      rating,
      review
    };

    // Save the rating and review to the database
    await Movie.findByIdAndUpdate(movieId, {
      $push: { ratingsAndReviews: newRatingAndReview }
    });

    res
      .status(201)
      .json({ message: "Rating and review submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
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
  submitRatingAndReview,
  getMovieById,
  getAllMovies
};
