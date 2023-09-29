const express = require("express");
const router = express.Router();
const Movie = require("../models/movie")
const movieController = require("../controllers/movieController");

// Get all movies with pagination
router.get("/", movieController.getAllMovies);

// Search movie by title
router.get("/search", movieController.searchMoviesByTitle);

// Get a movie by its ID
router.get("/:movieId", movieController.getMovieById);


// Route to submit ratings for a movie
router.post("/rate/:movieId", movieController.submitMovieRating);


module.exports = router;
