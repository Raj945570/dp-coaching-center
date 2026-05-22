const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Generate JWT Helper
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user (Student)
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    try {
        const { name, class: studentClass, dob, mobile, email, password } = req.body;

        // Basic validation
        if (!name || !studentClass || !dob || !mobile || !email || !password) {
            return res.status(400).json({ message: 'Please add all required fields' });
        }

        // Email validation pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please enter a valid email address' });
        }

        // Mobile validation pattern (10 digits)
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: 'Please enter a valid 10-digit mobile number' });
        }

        // Enforce password minimum length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Check if email is used by an admin to prevent collision
        const adminExists = await Admin.findOne({ email: normalizedEmail });
        if (adminExists) {
            return res.status(400).json({ message: 'This email is reserved for administration' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            class: studentClass,
            dob,
            mobile,
            email: normalizedEmail,
            password: hashedPassword,
        });

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                class: user.class,
                isAdmin: false,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({ message: 'Registration failed' });
        }
    } catch (error) {
        console.error('[Register API] Error:', error);
        return res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// @desc    Authenticate a user (Student or Admin)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter email and password' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // 1. Check Admin database
        let admin = await Admin.findOne({ email: normalizedEmail });

        // If admin@dpclasses.com is requested but admin does not exist in db, recreate it automatically
        if (!admin && normalizedEmail === 'admin@dpclasses.com') {
            try {
                console.log('Admin account missing. Auto-recreating via login flow...');
                const seedAdmin = require('../seedAdmin');
                await seedAdmin();
                admin = await Admin.findOne({ email: normalizedEmail });
            } catch (err) {
                console.error('Failed to auto-seed admin in login flow:', err.message);
            }
        }

        if (admin) {
            const isMatch = await bcrypt.compare(password, admin.password);
            if (isMatch) {
                return res.status(200).json({
                    _id: admin._id,
                    email: admin.email,
                    isAdmin: true,
                    token: generateToken(admin._id),
                });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        }

        // 2. Check User (Student) database
        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    class: user.class,
                    isAdmin: false,
                    token: generateToken(user._id),
                });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        }

        // 3. Not found in either database
        return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.error('[Login API] Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Forgot Password - Request reset OTP (Student or Admin)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Please provide email address' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // Check if Admin
        const admin = await Admin.findOne({ email: normalizedEmail });
        if (admin) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            admin.resetOTP = otp;
            admin.resetOTPExpires = expires;
            await admin.save();

            console.log(`[Forgot Password] Admin OTP for ${normalizedEmail}: ${otp}`);

            return res.status(200).json({
                message: 'OTP generated successfully',
                otp, // Returned for development/testing convenience
            });
        }

        // Check if User (Student)
        const user = await User.findOne({ email: normalizedEmail });
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            user.resetOTP = otp;
            user.resetOTPExpires = expires;
            await user.save();

            console.log(`[Forgot Password] Student OTP for ${normalizedEmail}: ${otp}`);

            return res.status(200).json({
                message: 'OTP generated successfully',
                otp, // Returned for development/testing convenience
            });
        }

        // Not found in either
        return res.status(404).json({ message: 'Email not registered' });
    } catch (error) {
        console.error('[Forgot Password API] Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reset Password - Reset password using OTP (Student or Admin)
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Please provide email, OTP, and new password' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        // 1. Check Admin
        const admin = await Admin.findOne({
            email: normalizedEmail,
            resetOTP: otp,
            resetOTPExpires: { $gt: Date.now() },
        });

        if (admin) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            admin.password = hashedPassword;
            admin.resetOTP = null;
            admin.resetOTPExpires = null;
            await admin.save();

            console.log(`[Reset Password] Admin password reset successful for: ${normalizedEmail}`);
            return res.status(200).json({ message: 'Password reset successful' });
        }

        // 2. Check User (Student)
        const user = await User.findOne({
            email: normalizedEmail,
            resetOTP: otp,
            resetOTPExpires: { $gt: Date.now() },
        });

        if (user) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetOTP = null;
            user.resetOTPExpires = null;
            await user.save();

            console.log(`[Reset Password] Student password reset successful for: ${normalizedEmail}`);
            return res.status(200).json({ message: 'Password reset successful' });
        }

        return res.status(400).json({ message: 'Invalid or expired OTP' });
    } catch (error) {
        console.error('[Reset Password API] Error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
};
