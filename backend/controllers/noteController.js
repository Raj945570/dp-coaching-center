const Note = require('../models/Note');
const cloudinary = require('../config/cloudinary');

// @desc    Upload a note
// @route   POST /api/notes/upload
// @access  Private (Admin only)
const uploadNote = async (req, res) => {
    try {
        const { title, subject } = req.body;
        
        // Ensure file was uploaded properly
        if (!req.file) {
            return res.status(400).json({ message: 'Please attach a file' });
        }

        // Log upload info for verification
        console.log('Multer file uploaded: ', req.file);

        const note = await Note.create({
            title,
            subject,
            pdfUrl: req.file.path, // coming from Cloudinary storage multer
            public_id: req.file.filename || req.file.public_id || '',
            uploadedBy: req.admin.id,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({}).sort({ uploadedAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get notes by subject
// @route   GET /api/notes/:subject
// @access  Public
const getNotesBySubject = async (req, res) => {
    try {
        const { subject } = req.params;
        const notes = await Note.find({ subject }).sort({ uploadedAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private (Admin only)
const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Delete raw file from Cloudinary using public_id
        const publicId = note.public_id;
        if (publicId) {
            try {
                console.log('Destroying Cloudinary note raw file:', publicId);
                await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
            } catch (clErr) {
                console.error('Error deleting note from Cloudinary:', clErr);
            }
        } else if (note.pdfUrl) {
            // Fallback to legacy parsing if public_id is missing
            try {
                const urlParts = note.pdfUrl.split('/');
                const uploadIndex = urlParts.indexOf('upload');
                if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
                    const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/');
                    const fallbackPublicId = decodeURIComponent(publicIdWithExtension);
                    console.log('Destroying Cloudinary note raw file (fallback):', fallbackPublicId);
                    await cloudinary.uploader.destroy(fallbackPublicId, { resource_type: 'raw' });
                }
            } catch (clErr) {
                console.error('Error deleting note from Cloudinary fallback:', clErr);
            }
        }

        await note.deleteOne();

        res.status(200).json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    uploadNote,
    getNotes,
    getNotesBySubject,
    deleteNote,
};
