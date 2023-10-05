const express = require("express");
const router = express.Router();
const movieRecommendationsController = require("../controllers/movierecommendationsController");

router.get(
  "/recommendedMovies",
  movieRecommendationsController.getRecommendedMovies
);

module.exports = router;
