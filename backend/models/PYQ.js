const mongoose = require('mongoose');

const pyqSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        enum: ['Chemistry', 'Physics', 'Hindi', 'History', 'Geography', 'Civics'],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    class: {
        type: Number,
        required: true,
        enum: [10, 12],
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

module.exports = mongoose.model('PYQ', pyqSchema);
