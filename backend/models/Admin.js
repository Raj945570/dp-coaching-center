const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
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

module.exports = mongoose.model('Admin', adminSchema);
