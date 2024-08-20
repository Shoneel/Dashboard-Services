const jwtUtils = require('../utils/jwtUtils');

exports.generateTokens = (userId) => {
  const accessToken = jwtUtils.generateAccessToken(userId);
  const refreshToken = jwtUtils.generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

exports.verifyRefreshToken = jwtUtils.verifyRefreshToken;