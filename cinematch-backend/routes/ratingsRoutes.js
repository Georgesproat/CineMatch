const express = require("express");
const router = express.Router();
const ratingsController = require("../controllers/ratingsController");

//  POST requests for submitting ratings
router.post("/submit", ratingsController.submitRatings);

module.exports = router;
