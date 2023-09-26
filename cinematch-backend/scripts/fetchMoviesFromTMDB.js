const mongoose = require("mongoose");
const axios = require("axios");
const Movie = require("../models/movie");
const Credits = require("../models/credits");
const CrewMember = require("../models/crewMember");

// Connect to MongoDB here
mongoose.connect("mongodb://127.0.0.1/CineMatch", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // Your TMDB API key
    const apiKey = "0af1f375cc6c9924fe0cc1a1a6fb67ef";
    const language = "en-US";
    let page = 1; // Start with the first page

    while (true) {
      // Fetch a page of movie IDs from TMDB
      const movieIdsResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&page=${page}`
      );

      const movieIds = movieIdsResponse.data.results.map(
        (movieData) => movieData.id
      );

      if (movieIds.length === 0) {
        // No more pages to fetch
        break;
      }

      const promises = movieIds.map(async (movieId) => {
        const [movieData, creditsData] = await Promise.all([
          fetchMovieDetails(movieId, apiKey, language),
          fetchCredits(movieId, apiKey)
        ]);

        const movie = await updateMovieInDatabase(movieData, movieId);
        await updateCreditsInDatabase(creditsData, movie._id);
      });

      await Promise.all(promises);
      page++; // Move to the next page
    }

    console.log(
      "Movies, credits, and crew members fetched and stored successfully."
    );
  } catch (error) {
    console.error("Error fetching and storing data:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});

async function fetchMovieDetails(movieId, apiKey, language) {
  const movieResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
  );
  return movieResponse.data;
}

async function fetchCredits(movieId, apiKey) {
  const creditsResponse = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
  );
  return creditsResponse.data;
}

async function updateMovieInDatabase(movieData, movieId) {
  const movie = await Movie.findOneAndUpdate(
    { tmdbId: movieId },
    {
      title: movieData.title,
      description: movieData.overview,
      releaseYear: new Date(movieData.release_date).getFullYear(),
      posterImageUrl: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
      backdropImageUrl: `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`
      // Add more fields as needed
    },
    { upsert: true, new: true }
  );
  return movie;
}

async function updateCreditsInDatabase(creditsData, movieId) {
  const bulkOps = [];

  for (const castMember of creditsData.cast) {
    const cast = await CrewMember.findOneAndUpdate(
      { tmdbId: castMember.id },
      {
        name: castMember.name,
        profileImageUrl: `https://image.tmdb.org/t/p/w500${castMember.profile_path}`
        // Add more fields as needed
      },
      { upsert: true, new: true }
    );

    bulkOps.push({
      updateOne: {
        filter: { movie: movieId, crewMember: cast._id, role: "actor" },
        update: {
          movie: movieId,
          crewMember: cast._id,
          role: "actor" // Adjust this based on your model
          // Map other fields from creditsData to your model
        },
        upsert: true
      }
    });
  }

  for (const crewMember of creditsData.crew) {
    const crew = await CrewMember.findOneAndUpdate(
      { tmdbId: crewMember.id },
      {
        name: crewMember.name,
        profileImageUrl: `https://image.tmdb.org/t/p/w500${crewMember.profile_path}`
        // Add more fields as needed
      },
      { upsert: true, new: true }
    );

    bulkOps.push({
      updateOne: {
        filter: { movie: movieId, crewMember: crew._id, role: crewMember.job },
        update: {
          movie: movieId,
          crewMember: crew._id,
          role: crewMember.job // Adjust this based on your model
          // Map other fields from creditsData to your model
        },
        upsert: true
      }
    });
  }

  await Credits.bulkWrite(bulkOps);
}
