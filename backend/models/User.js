const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    class: {
        type: String, // String to handle format like "Class 10" or "10"
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetOTP: {
        type: String,
        default: null,
    },
    resetOTPExpires: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
