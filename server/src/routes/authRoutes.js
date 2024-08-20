const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.get('/logout', auth, authController.logout);
router.post('/refresh', authController.refresh);

module.exports = router;