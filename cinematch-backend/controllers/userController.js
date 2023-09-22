const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//User Registration Controller
const register = async (req, res) => {
  // Access and validate user input
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    // Hash and salt the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the user data in the MongoDB database
    await newUser.save();

    // Generate a JSON Web Token (JWT)
    const secretKey = "your-secret-key"; // Replace with your secret key
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: "1h"
    });

    // Respond to the client with the generated JWT
    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

//User Login Controller
const login = async (req, res) => {
  // Access and validate user input
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide both email and password.' });
  }

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Generate a JSON Web Token (JWT) for the authenticated user
    const secretKey = 'your-secret-key'; // Replace with your secret key
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: '1h',
    });

    // Respond to the client with the generated JWT
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    // Fetch user data from the database based on the user ID stored in req.userId
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return the user's profile data (excluding sensitive information like the password)
    res.json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    // Fetch the user document from the database
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update user profile fields
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }

    // Save the updated user profile
    await user.save();

    // Respond with a success message
    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};

