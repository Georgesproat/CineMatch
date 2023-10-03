const express = require("express");
const router = express.Router();
const movieScoreController = require("../controllers/movieScoreController");

// Define a route for creating or updating a movie score
router.post("/:userId/:movieId", async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const movieScore = await movieScoreController.createOrUpdateMovieScore(
      userId,
      movieId
    );

    res
      .status(200)
      .json({
        message: "Movie score created/updated successfully",
        movieScore
      });
  } catch (error) {
    console.error("Error creating/updating movie score:", error);
    res.status(500).json({ error: "Failed to create/update movie score" });
  }
});

module.exports = router;
