const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Get dashboard stats (protected - admin only)
router.get('/stats', protectAdmin, getDashboardStats);

module.exports = router;
