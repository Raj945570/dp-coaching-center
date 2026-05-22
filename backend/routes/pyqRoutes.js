const express = require('express');
const router = express.Router();
const { uploadPYQ, getPYQs, deletePYQ } = require('../controllers/pyqController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getPYQs);
router.get('/:subjectOrClass', getPYQs);

// Protected routes
router.post('/upload', protectAdmin, upload.single('file'), uploadPYQ);
router.delete('/:id', protectAdmin, deletePYQ);

module.exports = router;
