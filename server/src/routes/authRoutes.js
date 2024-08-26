const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Sign in route
router.post('/signin', authController.signin);

// Sign up route
router.post('/signup', authController.signup);

// Logout route
router.post('/logout', auth, authController.logout);

// Refresh token route
router.post('/refresh', authController.refresh);

module.exports = router;
