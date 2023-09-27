const express = require("express");
const router = express.Router();
const crewScoresController = require("../controllers/crewScoresController");

// Route to create a new crew score
router.post("/", crewScoresController.createCrewScore);

module.exports = router;
