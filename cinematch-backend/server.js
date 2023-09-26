const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongoDBURI = "mongodb://127.0.0.1/CineMatch";
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
require("dotenv").config
let dbConnect = require("./dbConnect");

const app = express();


// Middleware for parsing JSON request bodies
app.use(express.json());


// Mount user routes
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../cine-match-frontend/dist")));

// Handle all other requests by serving the frontend's HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../cine-match-frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
