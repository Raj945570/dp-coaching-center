const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protectUser } = require('../middleware/authMiddleware');

// Protected routes
router.get('/profile', protectUser, getUserProfile);

module.exports = router;
