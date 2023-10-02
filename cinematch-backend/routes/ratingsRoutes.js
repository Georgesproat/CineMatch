const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

// POST request for submitting or updating ratings
router.post("/submit", ratingsController.submitOrUpdateRatings);

// PUT request for updating ratings (you can use the same controller)
router.put("/:movieId/user/:userId", ratingsController.submitOrUpdateRatings);

// GET request for fetching user ratings by movie ID and user ID
router.get("/:movieId/user/:userId", ratingsController.getUserRatings);

module.exports = router;
