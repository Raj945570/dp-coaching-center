const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verify that decoded.id belongs to an Admin document
            const adminExists = await Admin.exists({ _id: decoded.id });
            if (!adminExists) {
                return res.status(401).json({ message: 'Token invalid' });
            }

            // Add admin info to req object
            req.admin = decoded;

            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Token invalid' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const protectUser = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }

            return next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Token invalid' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protectAdmin, protectUser };
