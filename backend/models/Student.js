const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    targetExam: {
        type: String,
    },
    languageKnown: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
