const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        enum: ['Chemistry', 'Physics', 'Hindi', 'History', 'Geography', 'Civics'],
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Note', noteSchema);

