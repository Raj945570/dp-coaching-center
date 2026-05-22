const PYQ = require('../models/PYQ');
const cloudinary = require('../config/cloudinary');

// @desc    Upload a PYQ
// @route   POST /api/pyq/upload
// @access  Private (Admin only)
const uploadPYQ = async (req, res) => {
    try {
        const { title, class: pyqClass, subject, year } = req.body;
        
        // Ensure file was uploaded properly
        if (!req.file) {
            return res.status(400).json({ message: 'Please attach a file' });
        }

        console.log('Multer PYQ file uploaded: ', req.file);

        if (!title || !pyqClass || !subject || !year) {
            return res.status(400).json({ message: 'All fields (title, class, subject, year) are required' });
        }

        const pyq = await PYQ.create({
            title,
            subject,
            year: parseInt(year, 10),
            class: parseInt(pyqClass, 10),
            pdfUrl: req.file.path, // coming from Cloudinary
            public_id: req.file.filename || req.file.public_id || '',
            uploadedBy: req.admin.id,
        });

        res.status(201).json(pyq);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get PYQs with filtering
// @route   GET /api/pyq or GET /api/pyq/:subjectOrClass
// @access  Public
const getPYQs = async (req, res) => {
    try {
        const { subjectOrClass } = req.params;
        const { class: classQuery, subject: subjectQuery, year: yearQuery } = req.query;
        
        let query = {};
        
        if (subjectOrClass) {
            if (subjectOrClass === '10' || subjectOrClass === '12') {
                query.class = parseInt(subjectOrClass, 10);
            } else {
                query.subject = subjectOrClass;
            }
        }
        
        if (classQuery) {
            query.class = parseInt(classQuery, 10);
        }
        if (subjectQuery) {
            query.subject = subjectQuery;
        }
        if (yearQuery) {
            query.year = parseInt(yearQuery, 10);
        }
        
        const pyqs = await PYQ.find(query).sort({ uploadedAt: -1 });
        res.status(200).json(pyqs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a PYQ
// @route   DELETE /api/pyq/:id
// @access  Private (Admin only)
const deletePYQ = async (req, res) => {
    try {
        const { id } = req.params;
        const pyq = await PYQ.findById(id);

        if (!pyq) {
            return res.status(404).json({ message: 'PYQ not found' });
        }

        // Delete raw file from Cloudinary using public_id
        const publicId = pyq.public_id;
        if (publicId) {
            try {
                console.log('Destroying Cloudinary PYQ raw file:', publicId);
                await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
            } catch (clErr) {
                console.error('Error deleting PYQ from Cloudinary:', clErr);
            }
        } else if (pyq.pdfUrl) {
            // Fallback to legacy parsing if public_id is missing
            try {
                const urlParts = pyq.pdfUrl.split('/');
                const uploadIndex = urlParts.indexOf('upload');
                if (uploadIndex !== -1 && urlParts.length > uploadIndex + 2) {
                    const publicIdWithExtension = urlParts.slice(uploadIndex + 2).join('/');
                    const fallbackPublicId = decodeURIComponent(publicIdWithExtension);
                    console.log('Destroying Cloudinary PYQ raw file (fallback):', fallbackPublicId);
                    await cloudinary.uploader.destroy(fallbackPublicId, { resource_type: 'raw' });
                }
            } catch (clErr) {
                console.error('Error deleting PYQ from Cloudinary fallback:', clErr);
            }
        }

        await pyq.deleteOne();

        res.status(200).json({ message: 'PYQ removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    uploadPYQ,
    getPYQs,
    deletePYQ,
};

