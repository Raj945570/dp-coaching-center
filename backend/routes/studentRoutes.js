const express = require('express');
const router = express.Router();
const { createStudent, getStudents } = require('../controllers/studentController');
const { protectAdmin } = require('../middleware/authMiddleware');

// Public route (students submitting their info)
router.post('/', createStudent);

// Protected route (admin viewing student list)
router.get('/', protectAdmin, getStudents);

module.exports = router;
