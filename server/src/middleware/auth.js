const jwtUtils = require('../utils/jwtUtils');

// Simple in-memory blacklist; consider using Redis or another storage solution in production
const blacklist = new Set();

module.exports = function(req, res, next) {
  // Retrieve token from the Authorization header
  const token = req.header('Authorization');

  // Check if token is not present
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Extract the token value (remove 'Bearer ' prefix if present)
  const tokenValue = token.replace('Bearer ', '');

  // Check if the token is blacklisted
  if (blacklist.has(tokenValue)) {
    return res.status(401).json({ message: 'Token has been invalidated' });
  }

  try {
    // Verify the token
    const decoded = jwtUtils.verifyAccessToken(tokenValue);

    // Attach the decoded user to the request object
    req.user = decoded;
    next();
  } catch (err) {
    // Handle invalid token
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// Function to add a token to the blacklist (to be used in logout)
module.exports.addToBlacklist = function(token) {
  blacklist.add(token);
};
