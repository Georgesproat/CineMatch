const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongoDBURI = "mongodb://127.0.0.1/CineMatch";
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const ratingsRoutes = require("./routes/ratingsRoutes");

require("dotenv").config();
const cors = require("cors"); 


let dbConnect = require("./dbConnect");

const app = express();



// Middleware for CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Mount user routes
app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/ratings", ratingsRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
