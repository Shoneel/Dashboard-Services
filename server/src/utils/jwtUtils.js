const jwt = require('jsonwebtoken');
const { jwtSecret, jwtRefreshSecret } = require('../config/database');

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, jwtRefreshSecret, { expiresIn: '7d' });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, jwtSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, jwtRefreshSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};