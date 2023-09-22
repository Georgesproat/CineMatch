const express = require("express");
const mongoose = require("mongoose");
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

// Mount user routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
