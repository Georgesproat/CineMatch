const Ratings = require("../models/rating");
const CrewScore = require("../models/crewScore");
const Credit = require("../models/credits");

// Define the mapping of crew roles to rating categories here
const roleToCategoryMapping = {
  "Executive Producer": "storytelling",
  "Director": "storytelling",
  "Story Supervisor": "storytelling",
  "Screenplay": "storytelling",
  "Story": "storytelling",
  "Producer": "storytelling",
  "Screenstory": "storytelling",
  "Writer": "storytelling",
  "Gaffer": "visuals",
  "CG Supervisor": "visuals",
  "Visual Effects Producer": "visuals",
  "Director of Photography": "visuals",
  "Animation Supervisor": "visuals",
  "Editor": "visuals",
  "Lighting Supervisor": "visuals",
  "Visual Effects Supervisor": "visuals",
  "Animation Director": "visuals",
  "Animation Technical Director": "visuals",
  "Camera Operator": "visuals",
  "Set Designer": "production value",
  "Hair Department Head": "production value",
  "Set Decoration": "production value",
  "Costume Supervisor": "production value",
  "Production Design": "production value",
  "Effects Supervisor": "production value",
  "Costume Design": "production value",
  "Makeup Artist": "production value",
  "Art Department Manager": "production value",
  "Supervising Art Director": "production value",
  "Art Direction": "production value",
  "Costumer": "production value",
  "Casting": "performance",
  "Actor": "performance"
};



// Controller method to submit or update ratings
const submitOrUpdateRatings = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { movieId, userRatings, userId } = req.body;

    if (userRatings) {
      // Check if a rating already exists for the user and movie
      const existingRating = await Ratings.findOne({
        movieId: movieId,
        userId: userId
      });

      if (existingRating) {
        // Update the existing rating
        existingRating.storytellingRating = userRatings.storytelling;
        existingRating.visualsRating = userRatings.visuals;
        existingRating.productionValueRating = userRatings.productionValue;
        existingRating.performanceRating = userRatings.performance;

        await existingRating.save();
      } else {
        // Create a new rating entry
        await Ratings.create({
          movieId,
          storytellingRating: userRatings.storytelling,
          visualsRating: userRatings.visuals,
          productionValueRating: userRatings.productionValue,
          performanceRating: userRatings.performance,
          userId
        });
      }

      // Fetch crew members associated with the movie and their roles
      const credits = await Credit.find({ movie: movieId });

      // Calculate updated crew member ratings based on user ratings
      const crewScores = credits
        .map((credit) => {
          const role = credit.role;
          const category = roleToCategoryMapping[role];

          if (!category) {
            // Handle the case where the crew role doesn't have a mapping
            console.log(`No mapping found for role: ${role}`);
            return null;
          }

          // Use the user rating for the corresponding category
          const userRating = userRatings[category];

          // Logging for debugging
          console.log(`Processing crew member: ${credit.crewMember}`);
          console.log(
            `Role: ${role}, Category: ${category}, User Rating: ${userRating}`
          );

          return {
            user: userId,
            crewMember: credit.crewMember,
            score: userRating
          };
        })
        .filter((score) => score !== null); // Remove null entries

      // Create or update crew score entries
      await CrewScore.bulkWrite(
        crewScores.map((score) => ({
          updateOne: {
            filter: { user: score.user, crewMember: score.crewMember },
            update: { $set: { score: score.score } },
            upsert: true // Create if not exists
          }
        }))
      );

      // Send a success response
      res.json({ message: "Ratings submitted/updated successfully" });
    } else {
      // Handle the case where userRatings is not defined
      res.status(400).json({ error: "Invalid request data" });
    }
  } catch (error) {
    console.error("Error submitting/updating ratings:", error);
    res.status(500).json({ error: "Failed to submit/update ratings" });
  }
};


// Controller method to fetch user ratings by movie ID and user ID
const getUserRatings = async (req, res) => {
  try {
    const { movieId, userId } = req.params;

    // Query your database to fetch user ratings for the specified movie and user
    const userRatings = await Ratings.findOne({
      movieId: movieId,
      userId: userId
    });

    if (!userRatings) {
      return res.status(404).json({ error: "User ratings not found" });
    }

    // Return the user ratings as JSON response
    res.json({ ratings: userRatings });
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    res.status(500).json({ error: "Failed to fetch user ratings" });
  }
};

module.exports = {
  submitOrUpdateRatings, 
  getUserRatings
};
