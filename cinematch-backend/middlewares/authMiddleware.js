const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key"; // Replace with your secret key

// Middleware to verify JWT tokens
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized: Invalid token." });
    }

    // Attach the decoded user ID to the request object for later use
    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  verifyToken
};
