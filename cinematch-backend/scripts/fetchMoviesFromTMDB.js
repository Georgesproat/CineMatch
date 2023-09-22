const axios = require("axios");
const Movie = require("../models/movie"); 
const Credits = require("../models/credits"); 
const CrewMember = require("../models/crewMember"); 

const apiKey = "0af1f375cc6c9924fe0cc1a1a6fb67ef";
const language = "en-US";

async function fetchAndStoreMovies() {
  try {
    // Fetch a list of movie IDs
    const movieIdsResponse = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}`
    );

    const movieIds = movieIdsResponse.data.results.map(
      (movieData) => movieData.id
    );

    for (const movieId of movieIds) {
      // Fetch movie details
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`
      );
      const movieData = movieResponse.data;

      // Create or update the movie in your database
      const movie = await Movie.findOneAndUpdate(
        { tmdbId: movieData.id },
        {
          title: movieData.title
          // Map other fields from movieData to your model
        },
        { upsert: true, new: true }
      );

      // Fetch movie credits
      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      );
      const creditsData = creditsResponse.data;

      // Iterate through cast and crew and create/update corresponding models
      for (const castMember of creditsData.cast) {
        // Create or update cast members in your database
        const cast = await CrewMember.findOneAndUpdate(
          { tmdbId: castMember.id },
          {
            name: castMember.name
            // Map other fields from castMember to your model
          },
          { upsert: true, new: true }
        );

        // Create or update credits for cast members and link them to the movie
        const credit = await Credits.findOneAndUpdate(
          { movie: movie._id, crewMember: cast._id, role: 'actor' },
          {
            movie: movie._id,
            crewMember: cast._id,
            role: 'actor' // Adjust this based on your model
            // Map other fields from creditsData to your model
          },
          { upsert: true, new: true }
        );
      }

      // Iterate through crew members and create/update corresponding models
      for (const crewMember of creditsData.crew) {
        // Create or update crew members in your database
        const crew = await CrewMember.findOneAndUpdate(
          { tmdbId: crewMember.id },
          {
            name: crewMember.name
            // Map other fields from crewMember to your model
          },
          { upsert: true, new: true }
        );

        // Create or update credits for crew members and link them to the movie
        const credit = await Credits.findOneAndUpdate(
          { movie: movie._id, crewMember: crew._id, role: crewMember.job },
          {
            movie: movie._id,
            crewMember: crew._id,
            role: crewMember.job // Adjust this based on your model
            // Map other fields from creditsData to your model
          },
          { upsert: true, new: true }
        );
      }
    }

    console.log(
      'Movies, credits, and crew members fetched and stored successfully.'
    );
  } catch (error) {
    console.error('Error fetching and storing data:', error);
  }
}

fetchAndStoreMovies();
