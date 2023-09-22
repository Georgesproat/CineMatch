const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Define the route for user registration
router.post("/register", userController.register);
// Define the route for user login
router.post("/login", userController.login);
// Protected route example: Get user profile
router.get(
  "/profile",
  authMiddleware.verifyToken,
  userController.getUserProfile
);
// Protected route to update user profile
router.put(
  "/profile",
  authMiddleware.verifyToken,
  userController.updateUserProfile
);

module.exports = router;
