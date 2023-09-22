const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Import user routes

const app = express();

// ... Other middleware and configuration ...

// Mount user routes
app.use("/api/user", userRoutes);

// ... Other routes and server setup ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
