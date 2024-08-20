const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret, jwtRefreshSecret } = require('../config/database');
const authService = require('../services/authService');
const { USER_ROLE } = require('../scripts/mockData');

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).populate('role');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = authService.generateTokens(user._id);

    res.json({
      status: 0,
      message: 'Signin successful',
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          permissions: user.role.permissions
        },
        accessToken,
        refreshToken
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      role: USER_ROLE.id,
      permissions: USER_ROLE.permission
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.logout = (req, res) => {
  res.json({ status: 0, message: 'Logout successful' });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = authService.verifyRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = authService.generateTokens(decoded.userId);

    res.json({
      status: 0,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};