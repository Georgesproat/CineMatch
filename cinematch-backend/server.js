const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const mongoDBURI = "mongodb://127.0.0.1/CineMatch";
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose.connect(mongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware for parsing JSON request bodies
app.use(express.json());

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB!");
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../cine-match-frontend/dist")));

// Mount user routes
app.use("/api/user", userRoutes);

// Handle all other requests by serving the frontend's HTML file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../cine-match-frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
