const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');
const { jwtSecret, jwtRefreshSecret } = require('../config/database');
const authService = require('../services/authService');
const authMiddleware = require('../middleware/auth');

exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log(`Signin attempt for user: ${username}`);

    const user = await User.findOne({ username }).populate('role');
    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`Stored password hash for ${username}: ${user.password}`);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`Password validation result for ${username}: ${isPasswordValid}`);
    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${username}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = authService.generateTokens(user._id);

    console.log(`User signed in successfully: ${username}`);
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
          permissions: user.role.permissions,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Error during signin:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log('Signup request received:', { username, email, password });

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log('Username or email already exists:', { username, email });
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Fetch the default 'user' role from the database
    const userRole = await Role.findOne({ label: 'user' }); // Assuming 'user' is the role label
    if (!userRole) {
      console.log('User role not found in the database');
      return res.status(500).json({ message: 'User role not found' });
    }

    console.log('Creating new user with role:', userRole.name);

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password,
      role: userRole._id, // Assign the role ID from the database
      permissions: userRole.permissions, // Assign the permissions from the role
    });

    await user.save();

    console.log('User registered successfully:', user);

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during user signup:', error.message);
    res.status(500).json({ message: 'Error registering user' });
  }
};

exports.logout = (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Add token to blacklist
  authMiddleware.addToBlacklist(token);

  res.json({ status: 200, message: 'Logout successful' });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.log('Refresh token not provided');
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = authService.verifyRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = authService.generateTokens(decoded.userId);

    console.log('Token refreshed successfully for user:', decoded.userId);
    res.json({
      status: 0,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.error('Error during token refresh:', error.message);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};
