const express = require("express");
const router = express.Router();
const Movie = require("../models/movie")
const movieController = require("../controllers/movieController");

// Route to get a movie by ID
// router.get("/:movieId", (req, res) => {
// res.send("test")}
// // movieController.getMovieById
// ); 
// router.get("/", (req, res) => {
//   res.send("test");
//   // Controllers.likeController.deleteLike(req, res);
// });
// Route to get a movie by ID
router.get("/:movieId", movieController.getMovieById);

// Route to submit ratings for a movie
router.post("/rate/:movieId", async (req, res) => {
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
          crewMember.cinematography += ratings.cinematography;
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
        // Add more cases for other crew roles
      }
    });

    // Save the updated movie and crew members
    await movie.save();

    res.status(200).json({ message: "Ratings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
