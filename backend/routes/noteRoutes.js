const express = require('express');
const router = express.Router();
const { uploadNote, getNotes, getNotesBySubject, deleteNote } = require('../controllers/noteController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', getNotes);
router.get('/:subject', getNotesBySubject);

// Protected routes
router.post('/upload', protectAdmin, upload.single('file'), uploadNote);
router.delete('/:id', protectAdmin, deleteNote);

module.exports = router;
